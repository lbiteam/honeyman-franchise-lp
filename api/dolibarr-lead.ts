// Vercel Serverless Function for Dolibarr CRM Integration
// This function handles Dolibarr API calls server-side to avoid CORS issues
// and to keep the DOLIBARR_API_KEY off the client.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Agent, setGlobalDispatcher } from 'undici';

// TEMPORARY: allow self-signed certificate on the Dolibarr server.
// Remove this once crm.honeymanstore.com has a trusted SSL certificate (e.g. Let's Encrypt).
setGlobalDispatcher(new Agent({ connect: { rejectUnauthorized: false } }));

interface DolibarrLeadPayload {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  subject?: string;
  message?: string;
  formType?: 'franchise' | 'contact';
  countryCode?: string;
  phoneLocal?: string;
  city?: string;
  chooseModel?: string;
  preferredModel?: string;
}

function buildFranchiseNote(data: DolibarrLeadPayload): string {
  const lines = [
    '--- Website Franchise Form ---',
    data.name && `Name: ${data.name.trim()}`,
    data.email && `Email: ${data.email.trim()}`,
    data.phone && `Phone (full): ${data.phone.trim()}`,
    data.countryCode && `Country code: ${data.countryCode.trim()}`,
    data.phoneLocal && `Phone (local): ${data.phoneLocal.trim()}`,
    (data.city || data.location) && `City: ${(data.city || data.location)?.trim()}`,
    data.chooseModel && `Choose model: ${data.chooseModel.trim()}`,
    data.preferredModel && `Preferred model: ${data.preferredModel.trim()}`,
    data.subject && `Subject: ${data.subject.trim()}`,
  ].filter(Boolean) as string[];

  return lines.join('\n');
}

function buildContactNote(data: DolibarrLeadPayload): string {
  return data.message?.trim() || '';
}

function buildNote(data: DolibarrLeadPayload): string {
  const isFranchise =
    data.formType === 'franchise' ||
    String(data.subject || '').toLowerCase().includes('franchise');

  return isFranchise ? buildFranchiseNote(data) : buildContactNote(data);
}

function setCorsHeaders(res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

/**
 * Looks up an existing Dolibarr third party by email, then phone.
 * Returns the numeric id if found, otherwise null.
 */
async function findExistingThirdParty(
  baseUrl: string,
  apiKey: string,
  email?: string,
  phone?: string
): Promise<number | null> {
  const tryLookup = async (field: 'email' | 'phone', value: string): Promise<number | null> => {
    const url = `${baseUrl}/thirdparties?sqlfilters=${encodeURIComponent(
      `(t.${field}:=:'${value.replace(/'/g, "\\'")}')`
    )}`;

    const resp = await fetch(url, { headers: { DOLAPIKEY: apiKey } });
    if (!resp.ok) return null;

    const results = await resp.json().catch(() => null);
    return Array.isArray(results) && results.length > 0 ? results[0].id : null;
  };

  if (email) {
    const id = await tryLookup('email', email);
    if (id) return id;
  }
  if (phone) {
    const id = await tryLookup('phone', phone);
    if (id) return id;
  }
  return null;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res);
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    setCorsHeaders(res);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body as DolibarrLeadPayload;

    const baseUrl = process.env.DOLIBARR_URL || process.env.VITE_DOLIBARR_URL;
    const apiKey = process.env.DOLIBARR_API_KEY || process.env.VITE_DOLIBARR_API_KEY;

    if (!baseUrl || !apiKey) {
      setCorsHeaders(res);
      return res.status(500).json({
        success: false,
        error: 'Dolibarr credentials not configured',
      });
    }

    const email = formData.email?.trim().toLowerCase() || undefined;
    const phone = formData.phone?.trim() || undefined;
    const name = formData.name?.trim() || 'Unnamed Lead';
    const note = buildNote(formData);

    // 1. Check for an existing prospect by email, then phone
    const existingId = await findExistingThirdParty(baseUrl, apiKey, email, phone);

    if (existingId) {
      // Append a note instead of creating a duplicate record
      const getResp = await fetch(`${baseUrl}/thirdparties/${existingId}`, {
        headers: { DOLAPIKEY: apiKey },
      });

      if (!getResp.ok) {
        throw new Error(`Dolibarr lookup failed: ${getResp.statusText}`);
      }

      const existing = await getResp.json();
      const updatedNote = [
        existing.note_public || '',
        `Repeat inquiry (${new Date().toISOString()}):`,
        note,
      ]
        .filter(Boolean)
        .join('\n');

      const updateResp = await fetch(`${baseUrl}/thirdparties/${existingId}`, {
        method: 'PUT',
        headers: { DOLAPIKEY: apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ note_public: updatedNote }),
      });

      if (!updateResp.ok) {
        const errorText = await updateResp.text();
        throw new Error(`Dolibarr update failed: ${updateResp.statusText} - ${errorText}`);
      }

      setCorsHeaders(res);
      return res.status(200).json({
        success: true,
        duplicate: true,
        data: { id: existingId },
        message: 'Existing prospect updated in Dolibarr CRM',
      });
    }

    // 2. No match found — create a new prospect
    const leadData: Record<string, string | number | undefined> = {
      name,
      email,
      phone,
      client: 2, // 2 = Prospect status in Dolibarr
      note_public: note || undefined,
    };

    const createResp = await fetch(`${baseUrl}/thirdparties`, {
      method: 'POST',
      headers: { DOLAPIKEY: apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData),
    });

    if (!createResp.ok) {
      const errorText = await createResp.text();
      throw new Error(`Dolibarr API error: ${createResp.statusText} - ${errorText}`);
    }

    const newId = await createResp.json();

    setCorsHeaders(res);
    return res.status(200).json({
      success: true,
      duplicate: false,
      data: { id: newId },
      message: 'Lead created successfully in Dolibarr CRM',
    });
  } catch (error: unknown) {
    console.error('Dolibarr CRM API error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to create lead in Dolibarr CRM';
    setCorsHeaders(res);
    return res.status(500).json({
      success: false,
      error: message,
    });
  }
}