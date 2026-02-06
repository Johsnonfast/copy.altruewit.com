# RFQ Google Sheet + Apps Script Setup

## 1) Create the Google Sheet
1. Sign in as `qqqqqqiang@gmail.com`.
2. Create a new Google Sheet named `Altruewit RFQ`.
3. Copy the Sheet ID from the URL.
4. Share the sheet with `769327232@qq.com` as **Editor**.

## 2) Create the Apps Script
1. In the Sheet: Extensions -> Apps Script.
2. Replace the default code with `Code.gs` from this folder.
3. Save the project as `Altruewit RFQ API`.

## 3) Set Script Properties (Secrets)
In Apps Script: Project Settings -> Script Properties.
Add the following keys:

- `SHEET_ID` = your Sheet ID
- `RECAPTCHA_SECRET` = reCAPTCHA v3 secret key
- `NOTIFY_EMAILS` = `johnson@altruewit.com,summer@altruewit.com`
- `REPLY_TO` = `summer@altruewit.com`
- `TIMEZONE` = `Asia/Shanghai`

## 4) Deploy as Web App
1. Deploy -> New deployment.
2. Select type: Web app.
3. Execute as: Me.
4. Who has access: Anyone.
5. Click Deploy and copy the Web App URL.

## 5) Test the Endpoint
Send a POST request with JSON payload:

```
{
  "companyName": "Test Co",
  "contactName": "Jane",
  "businessEmail": "test@example.com",
  "countryRegion": "USA",
  "productInterest": "AI Product Series",
  "estimatedOrderQuantity": "500",
  "requirementsMessage": "Test request",
  "privacyConsent": true,
  "recaptchaToken": "<token>",
  "recaptchaAction": "rfq_submit",
  "sourcePage": "https://www.altruewit.com/contact/"
}
```

If it returns `{ "ok": true }`, you are ready to connect the site.
