# GHL API Key Troubleshooting Session
**Date:** February 23, 2026

## Objective
Update the GoHighLevel API key and run the foundation setup script (`scripts/ghl-setup.js`).

## Actions Taken
1. Received a new API Key payload from the user.
2. Decoded the JWT payload to verify the Location ID (`OKIhS7IwmBqsinp4BOZV`).
3. Updated the `.env.local` file with the new credentials.
4. Executed the `ghl-setup.js` script to auto-create custom fields and values.

## Results
The setup script failed with a `401 Unauthorized` error.
A verbose curl request was run to inspect the exact failure from the GoHighLevel API server (`services.leadconnectorhq.com`).
The server returned: `{"statusCode":401,"message":"Invalid JWT"}`.

## Diagnosis: V1 vs V2 API Key Confusion
The provided key is formatted as a **V2 API Key** (a JWT containing a `location_id` payload). However, it is being rejected as an "Invalid JWT" by the V2 endpoints.

*   **V1 Legacy Keys:** Found in GHL under **Settings -> Business Profile**. These are shorter, non-JWT strings used with `rest.gohighlevel.com`.
*   **V2 Keys/Tokens:** Used with `services.leadconnectorhq.com`. These are typically generated via an OAuth2 flow or a private app integration in the Agency Settings.
*   **The Error:** The `{"message": "Invalid JWT"}` error indicates the key was likely truncated, copy-pasted incorrectly, or the secret used to sign it on GHL's end is no longer valid.

## Next Steps
To proceed with the automation build, a valid API key is required.

**Option A (Recommended for V2):**
If you are an Agency Admin, go to **Agency Settings -> App Marketplace** and create a Private App for Soleil Pharmacy. This will provide a valid V2 Client ID/Secret or a Long-lived Access Token.

**Option B (Legacy V1):**
If you prefer to use the V1 API, navigate to **Settings -> Business Profile**, copy the "API Key" (it will not look like a JWT), and provide it. The setup scripts will then need to be updated to target the legacy `rest.gohighlevel.com` endpoints.
