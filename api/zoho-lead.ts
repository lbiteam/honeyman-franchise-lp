// Vercel Serverless Function for Zoho CRM Integration
// This function handles Zoho API calls server-side to avoid CORS issues

import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ZohoLeadPayload {
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

function buildFranchiseDescription(data: ZohoLeadPayload): string {
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

function buildContactDescription(data: ZohoLeadPayload): string {
  return data.message?.trim() || '';
}

/** Must match picklist values in Zoho CRM → Leads → Lead Status (add any missing options there). */
const FRANCHISE_LEAD_STATUS_BY_MODEL: Record<string, string> = {
  'Ice Cream Cart (₹4-5L)': 'Ice Cream Franchise - Cart (₹4-5L)',
  'Ice Cream Parlour (₹15-20L)': 'Ice Cream Franchise - Parlour (₹15-20L)',
  'Cafe Honeyman (₹25-30L)': 'Ice Cream Franchise - Cafe Honeyman (₹25-30L)',
  'Chai Plus Express (₹5-8L)': 'Chai Plus Franchise - Express (₹5-8L)',
  'Chai Plus Cafe (₹15-25L)': 'Chai Plus Franchise - Cafe (₹15-25L)',
  'Chai Plus Lounge (₹50L+)': 'Chai Plus Franchise - Lounge (₹50L+)',
};

const FRANCHISE_LEAD_STATUS_BY_BRAND: Record<string, string> = {
  'Ice Cream': 'Ice Cream Franchise Inquiry',
  'Chai Plus': 'Chai Plus Franchise Inquiry',
};

function resolveFranchiseLeadStatus(data: ZohoLeadPayload): string {
  const preferred = data.preferredModel?.trim();
  if (preferred && FRANCHISE_LEAD_STATUS_BY_MODEL[preferred]) {
    return FRANCHISE_LEAD_STATUS_BY_MODEL[preferred];
  }

  const brand = data.chooseModel?.trim();
  if (brand && FRANCHISE_LEAD_STATUS_BY_BRAND[brand]) {
    return FRANCHISE_LEAD_STATUS_BY_BRAND[brand];
  }

  return 'Franchise Inquiry';
}

function resolveLeadStatus(data: ZohoLeadPayload): string {
  const subject = (data.subject || '').toLowerCase();
  const isFranchise =
    data.formType === 'franchise' || subject.includes('franchise');

  if (isFranchise) {
    return resolveFranchiseLeadStatus(data);
  }
  if (subject === 'corporate' || subject.includes('corporate')) {
    return 'Corporate Inquiry';
  }
  if (subject === 'support' || subject.includes('support')) {
    return 'Support Request';
  }
  return 'General Inquiry';
}

function resolveLeadSource(data: ZohoLeadPayload): string {
  if (data.formType === 'franchise') {
    return 'Website Franchise Form';
  }
  return 'Website Contact Form';
}

function setCorsHeaders(res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
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
    const formData = req.body as ZohoLeadPayload;

    const zohoClientId = process.env.ZOHO_CLIENT_ID || process.env.VITE_ZOHO_CLIENT_ID;
    const zohoClientSecret = process.env.ZOHO_CLIENT_SECRET || process.env.VITE_ZOHO_CLIENT_SECRET;
    const zohoRefreshToken = process.env.ZOHO_REFRESH_TOKEN || process.env.VITE_ZOHO_REFRESH_TOKEN;
    const zohoApiDomain = process.env.ZOHO_API_DOMAIN || process.env.VITE_ZOHO_API_DOMAIN || 'https://www.zohoapis.com';
    const zohoRegion = process.env.ZOHO_REGION || process.env.VITE_ZOHO_REGION || 'com';

    if (!zohoClientId || !zohoClientSecret || !zohoRefreshToken) {
      setCorsHeaders(res);
      return res.status(500).json({
        success: false,
        error: 'Zoho CRM credentials not configured',
      });
    }

    const tokenUrl = `https://accounts.zoho.${zohoRegion}/oauth/v2/token`;
    const tokenParams = new URLSearchParams({
      refresh_token: zohoRefreshToken,
      client_id: zohoClientId,
      client_secret: zohoClientSecret,
      grant_type: 'refresh_token',
    });

    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: tokenParams,
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error(`Zoho token request failed: ${tokenResponse.statusText} - ${errorText}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error('Failed to get access token from Zoho');
    }

    const isFranchise =
      formData.formType === 'franchise' ||
      String(formData.subject || '').toLowerCase().includes('franchise');

    const city =
      formData.city?.trim() ||
      formData.location?.trim() ||
      undefined;

    const description = isFranchise
      ? buildFranchiseDescription(formData)
      : buildContactDescription(formData);

    const leadData: Record<string, string | undefined> = {
      Last_Name: formData.name?.trim() || '',
      Email: formData.email?.trim() || undefined,
      Phone: formData.phone?.trim() || undefined,
      City: city,
      Company: isFranchise ? formData.chooseModel?.trim() || undefined : undefined,
      Description: description || undefined,
      Lead_Source: resolveLeadSource(formData),
      Lead_Status: resolveLeadStatus(formData),
    };

    // Franchise-only detail in Description; optional custom fields via env
    if (isFranchise && formData.preferredModel?.trim()) {
      const preferredField =
        process.env.ZOHO_FRANCHISE_MODEL_FIELD ||
        process.env.VITE_ZOHO_FRANCHISE_MODEL_FIELD;
      if (preferredField) {
        leadData[preferredField] = formData.preferredModel.trim();
      }
    }

    const apiUrl = `${zohoApiDomain}/crm/v3/Leads`;

    const leadResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [leadData] }),
    });

    if (!leadResponse.ok) {
      const errorData = await leadResponse.json().catch(() => ({}));
      throw new Error(`Zoho API error: ${leadResponse.statusText} - ${JSON.stringify(errorData)}`);
    }

    const result = await leadResponse.json();

    setCorsHeaders(res);
    return res.status(200).json({
      success: true,
      data: result.data?.[0],
      message: 'Lead created successfully in Zoho CRM',
    });
  } catch (error: unknown) {
    console.error('Zoho CRM API error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to create lead in Zoho CRM';
    setCorsHeaders(res);
    return res.status(500).json({
      success: false,
      error: message,
    });
  }
}
