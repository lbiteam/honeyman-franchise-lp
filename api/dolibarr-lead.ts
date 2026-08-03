// Vercel Serverless Function for Dolibarr CRM Integration
// This function handles Dolibarr API calls server-side to avoid CORS issues
// and to keep the DOLIBARR_API_KEY off the client.

import type { VercelRequest, VercelResponse } from '@vercel/node';

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

// Strips everything except digits, so "+91 987 654 3210" and "919876543210"
// are treated as the same number. This fixes the "second submission missing"
// bug, which was caused by phone-format mismatches breaking duplicate lookup.
function normalizePhone(phone?: string): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, '');
  return digits || undefined;
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

/**
 * Maps form data into Dolibarr's custom extrafields (array_options), based
 * on the Third Party extrafield setup: lead_source, email_id, business_model,
 * investment_timeline, whats_was_the_budget_for_the_franchise, city, state,
 * country, name, phone.
 *
 * NOTE: "investment_timeline" is still a best-guess based on the truncated
 * label in the Dolibarr extrafields screen ("investment_tim..."). If that
 * field doesn't populate after testing, open Setup -> Extrafields -> Third
 * Party in Dolibarr, click edit on that row, confirm the exact "Attribute
 * code", and tell me the correct value so I can fix the key name below.
 */
function buildExtrafields(data: DolibarrLeadPayload, normalizedPhone?: string) {
  return {
    options_lead_source: 'Website Franchise Form',
    options_email_id: data.email?.trim() || '',
    options_business_model: data.chooseModel?.trim() || '',
    options_investment_timeline: '', // not currently collected by the form
    options_whats_was_the_budget_for_franchise: data.preferredModel?.trim() || '',
    options_city: (data.city || data.location)?.trim() || '',
    options_state: '', // not currently collected by the form
    options_country: '', // not currently collected by the form
    options_name: data.name?.trim() || '',
    options_phone: normalizedPhone || '',
  };
}

function setCorsHeaders(res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

/**
 * Looks up an existing Dolibarr third party by email, then normalized phone.
 * Returns the numeric id if found, otherwise null.
 */
async function findExistingThirdParty(
  baseUrl: string,
  apiKey: string,
  email?: string,
  normalizedPhone?: string
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
  if (normalizedPhone) {
    // Search using the normalized digits-only value, matching how we now store it
    const id = await tryLookup('phone', normalizedPhone);
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
    const normalizedPhone = normalizePhone(formData.phone);
    const name = formData.name?.trim() || 'Unnamed Lead';
    const note = buildNote(formData);
    const extrafields = buildExtrafields(formData, normalizedPhone);

    // 1. Check for an existing prospect by email, then normalized phone
    const existingId = await findExistingThirdParty(baseUrl, apiKey, email, normalizedPhone);

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

      // Update the core note first — this must succeed for the lead to register.
      const updateResp = await fetch(`${baseUrl}/thirdparties/${existingId}`, {
        method: 'PUT',
        headers: { DOLAPIKEY: apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ note_public: updatedNote }),
      });

      if (!updateResp.ok) {
        const errorText = await updateResp.text();
        throw new Error(`Dolibarr update failed: ${updateResp.statusText} - ${errorText}`);
      }

      // Extrafields update is best-effort — a bad/renamed field code here
      // must never prevent the lead from being registered as a duplicate.
      try {
        const extraResp = await fetch(`${baseUrl}/thirdparties/${existingId}`, {
          method: 'PUT',
          headers: { DOLAPIKEY: apiKey, 'Content-Type': 'application/json' },
          body: JSON.stringify({ array_options: extrafields }),
        });
        if (!extraResp.ok) {
          const extraErrorText = await extraResp.text();
          console.warn(`Dolibarr extrafields update failed (non-blocking): ${extraResp.statusText} - ${extraErrorText}`);
        }
      } catch (extraErr) {
        console.warn('Dolibarr extrafields update threw (non-blocking):', extraErr);
      }

      setCorsHeaders(res);
      return res.status(200).json({
        success: true,
        duplicate: true,
        data: { id: existingId },
        message: 'Existing prospect updated in Dolibarr CRM',
      });
    }

    // 2. No match found — create a new prospect, with extrafields populated
    const leadData: Record<string, unknown> = {
      name,
      email,
      phone: normalizedPhone,
      client: 2, // 2 = Prospect status in Dolibarr
      note_public: note || undefined,
      array_options: extrafields,
    };

    let createResp = await fetch(`${baseUrl}/thirdparties`, {
      method: 'POST',
      headers: { DOLAPIKEY: apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData),
    });

    if (!createResp.ok) {
      const errorText = await createResp.text();
      console.warn(
        `Dolibarr create with extrafields failed, retrying with core fields only: ${createResp.statusText} - ${errorText}`
      );

      // Fallback: a bad/renamed extrafield code must never cause the lead
      // to be lost entirely. Retry with just the core fields.
      const coreOnlyData = {
        name,
        email,
        phone: normalizedPhone,
        client: 2,
        note_public: note || undefined,
      };

      createResp = await fetch(`${baseUrl}/thirdparties`, {
        method: 'POST',
        headers: { DOLAPIKEY: apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify(coreOnlyData),
      });

      if (!createResp.ok) {
        const retryErrorText = await createResp.text();
        throw new Error(`Dolibarr API error (retry also failed): ${createResp.statusText} - ${retryErrorText}`);
      }
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