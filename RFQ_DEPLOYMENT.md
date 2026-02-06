# RFQ System Deployment Guide

## Overview
This guide walks you through deploying the complete RFQ (Request for Quote) system for Altruewit's website.

## Prerequisites
- Google Account: `qqqqqqiang@gmail.com`
- Shared Editor: `769327232@qq.com`
- reCAPTCHA v3 keys (site key and secret key)

---

## Step 1: Create Google Sheet

1. **Sign in** to Google with `qqqqqqiang@gmail.com`
2. **Create new Sheet**: Visit [sheets.new](https://sheets.new) or go to [Google Sheets](https://sheets.google.com)
3. **Name the sheet**: `Altruewit RFQ`
4. **Copy the Sheet ID** from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
   - Example: `https://docs.google.com/spreadsheets/d/1ABC123XYZ789/edit` → Sheet ID: `1ABC123XYZ789`
5. **Share the sheet**:
   - Click "Share" button
   - Add `769327232@qq.com`
   - Select "Editor" role
   - Click "Send"

---

## Step 2: Get reCAPTCHA v3 Keys

1. **Visit** [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)
2. **Create a new site**:
   - **Label**: `Altruewit Website`
   - **reCAPTCHA type**: `reCAPTCHA v3`
   - **Domains**: Add your domains:
     - `altruewit.com`
     - `www.altruewit.com`
     - `altruewit.vercel.app` (for testing)
     - `localhost` (for local development)
3. **Accept terms** and click "Submit"
4. **Copy and save**:
   - **Site Key**: `h6LeFkFIsAAAAAJo6jEUqlk5XQn1Lf1WtWL-WqMZ2` (already in config.js)
   - **Secret Key**: `YOUR_SECRET_KEY_HERE` (needed for Apps Script)

---

## Step 3: Deploy Google Apps Script

### Option A: From Google Sheet (Recommended)

1. **Open** the `Altruewit RFQ` Google Sheet
2. **Navigate to**: Extensions → Apps Script
3. **Copy** the content from `apps-script/Code.gs` in this project
4. **Paste** into the Apps Script editor
5. **Save** the project (Ctrl+S or Cmd+S)
6. **Name** the project: `Altruewit RFQ API`

### Option B: Create Standalone Script

1. **Visit** [script.google.com](https://script.google.com)
2. **Click** "New project"
3. **Copy and paste** the code from `apps-script/Code.gs`
4. **Save** the project

---

## Step 4: Configure Script Properties

1. In Apps Script, click **Project Settings** (gear icon)
2. Scroll to **Script Properties**
3. Click **Add property** and add these key-value pairs:

| Property | Value |
|----------|-------|
| `SHEET_ID` | Your Google Sheet ID (from Step 1) |
| `RECAPTCHA_SECRET` | Your reCAPTCHA v3 Secret Key (from Step 2) |
| `NOTIFY_EMAILS` | `johnson@altruewit.com,summer@altruewit.com` |
| `REPLY_TO` | `summer@altruewit.com` |
| `TIMEZONE` | `Asia/Shanghai` |

4. **Click Save**

---

## Step 5: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the **gear icon** next to "Select type" → choose **Web app**
3. Configure:
   - **Description**: `Production RFQ API`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Click **Deploy**
5. **Copy the Web App URL** (format: `https://script.google.com/macros/s/XXXXX/exec`)
6. **Important**: Click "Done" to close the deployment dialog

---

## Step 6: Update Website Configuration

Edit `assets/js/config.js`:

```javascript
window.SITE_CONFIG = {
  ga4Id: "",
  recaptchaSiteKey: "h6LeFkFIsAAAAAJo6jEUqlk5XQn1Lf1WtWL-WqMZ2",  // Your site key
  rfqEndpoint: "YOUR_WEB_APP_URL_HERE",  // Paste the Web App URL here
  recaptchaAction: "rfq_submit"
};
```

Replace `YOUR_WEB_APP_URL_HERE` with the URL from Step 5.

---

## Step 7: Test the RFQ System

### Test with curl:
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Test Company",
    "contactName": "Test User",
    "businessEmail": "test@example.com",
    "countryRegion": "USA",
    "productInterest": "AI Product Series",
    "estimatedOrderQuantity": "500",
    "requirementsMessage": "This is a test submission",
    "privacyConsent": true,
    "recaptchaToken": "",
    "recaptchaAction": "rfq_submit",
    "sourcePage": "https://www.altruewit.com/contact/"
  }' \
  https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### Test on Website:
1. Visit the Contact page
2. Fill in the RFQ form
3. Submit and verify:
   - Success message appears
   - Email confirmation received
   - Google Sheet gets a new row
   - Internal notification email sent

---

## Troubleshooting

### "Missing SHEET_ID" Error
- Verify Script Properties are set correctly
- Check the Sheet ID is correct (not the full URL)
- Re-save Script Properties

### "reCAPTCHA failed" Error
- Verify `RECAPTCHA_SECRET` in Script Properties
- Ensure the secret key matches the site key
- Check the site key in `config.js` is correct

### CORS Errors
- The Web App should have "Who has access: Anyone"
- Wait 30 seconds after deployment for changes to take effect
- Check the deployment is set to execute as "Me"

### Emails Not Sending
- Verify `NOTIFY_EMAILS` and `REPLY_TO` are correct
- Check spam folder
- Google may block if sending too many emails

### Form Shows "RFQ endpoint not configured"
- Check `config.js` has the correct `rfqEndpoint` value
- Verify the Web App URL is complete (should end with `/exec`)
- Clear browser cache and refresh

---

## Security Notes

1. **Never commit** the reCAPTCHA secret key to public repositories
2. **Use environment variables** in production deployments
3. **Monitor** the Google Sheet for spam submissions
4. **Regularly review** Script Properties for any changes

---

## File References

- **Backend Code**: `apps-script/Code.gs`
- **Frontend Config**: `assets/js/config.js`
- **Frontend Form**: `assets/js/rfq.js`
- **Contact Page**: `contact/index.html`

---

## Support

If you encounter issues:
1. Check the Apps Script **Execution Log** (View → Executions)
2. Verify all Script Properties are set correctly
3. Test with a simple curl request first
4. Check Google Sheet is shared with the editor

---

## Deployment Checklist

- [ ] Google Sheet created and shared
- [ ] reCAPTCHA v3 keys obtained
- [ ] Apps Script code deployed
- [ ] Script Properties configured
- [ ] Web App deployed with "Anyone" access
- [ ] Web App URL copied
- [ ] `config.js` updated with endpoint
- [ ] Website tested end-to-end
- [ ] Email notifications verified
- [ ] Google Sheet receiving submissions