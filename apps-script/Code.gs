const REQUIRED_FIELDS = [
  'companyName',
  'contactName',
  'businessEmail',
  'countryRegion',
  'productInterest',
  'estimatedOrderQuantity',
  'requirementsMessage'
];

const HEADER_COLUMNS = [
  'Submitted At',
  'Company Name',
  'Contact Name',
  'Business Email',
  'Country/Region',
  'Product Interest',
  'Estimated Order Quantity',
  'Requirements Message',
  'Company Website',
  'WhatsApp/Phone',
  'Target Market',
  'Timeline',
  'Customization',
  'Source Page',
  'Privacy Consent'
];

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    if (!payload) {
      return json_({ ok: false, message: 'Invalid payload.' }, 400);
    }

    if (payload.website) {
      return json_({ ok: true, message: 'Accepted.' });
    }

    const missing = REQUIRED_FIELDS.filter((key) => !payload[key]);
    if (missing.length) {
      return json_({ ok: false, message: 'Missing required fields.' }, 400);
    }

    if (!payload.privacyConsent) {
      return json_({ ok: false, message: 'Privacy consent required.' }, 400);
    }

    if (isRateLimited_(payload.businessEmail)) {
      return json_({ ok: false, message: 'Too many requests.' }, 429);
    }

    const recaptchaResult = verifyRecaptcha_(payload.recaptchaToken, payload.recaptchaAction);
    if (!recaptchaResult.ok) {
      return json_({ ok: false, message: 'reCAPTCHA failed.' }, 403);
    }

    const sheet = getSheet_();
    ensureHeader_(sheet);

    const timestamp = Utilities.formatDate(new Date(), getTimezone_(), 'yyyy-MM-dd HH:mm:ss');
    const row = [
      timestamp,
      payload.companyName,
      payload.contactName,
      payload.businessEmail,
      payload.countryRegion,
      payload.productInterest,
      payload.estimatedOrderQuantity,
      payload.requirementsMessage,
      payload.companyWebsite || '',
      payload.whatsappPhone || '',
      payload.targetMarket || '',
      payload.timeline || '',
      payload.customization || '',
      payload.sourcePage || '',
      payload.privacyConsent ? 'Yes' : 'No'
    ];

    sheet.appendRow(row);

    sendInternalNotification_(payload, timestamp);
    sendCustomerConfirmation_(payload);

    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, message: 'Server error.' }, 500);
  }
}

function parsePayload_(e) {
  if (!e) {
    return null;
  }

  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (error) {
      return e.parameter || null;
    }
  }

  return e.parameter || null;
}

function verifyRecaptcha_(token, action) {
  if (!token) {
    return { ok: false };
  }

  const secret = getScriptProperty_('RECAPTCHA_SECRET');
  if (!secret) {
    return { ok: false };
  }

  const response = UrlFetchApp.fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'post',
    payload: {
      secret: secret,
      response: token
    },
    muteHttpExceptions: true
  });

  const result = JSON.parse(response.getContentText() || '{}');
  if (!result.success) {
    return { ok: false };
  }

  if (action && result.action && action !== result.action) {
    return { ok: false };
  }

  if (typeof result.score === 'number' && result.score < 0.3) {
    return { ok: false };
  }

  return { ok: true, score: result.score };
}

function isRateLimited_(email) {
  if (!email) {
    return false;
  }

  const cache = CacheService.getScriptCache();
  const key = 'rfq:' + email.toLowerCase();
  if (cache.get(key)) {
    return true;
  }

  cache.put(key, '1', 60 * 5);
  return false;
}

function getSheet_() {
  const sheetId = getScriptProperty_('SHEET_ID');
  if (!sheetId) {
    throw new Error('Missing SHEET_ID');
  }

  const spreadsheet = SpreadsheetApp.openById(sheetId);
  return spreadsheet.getSheets()[0];
}

function ensureHeader_(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, HEADER_COLUMNS.length).getValues()[0];
  const isEmpty = firstRow.every((cell) => !cell);
  if (isEmpty) {
    sheet.getRange(1, 1, 1, HEADER_COLUMNS.length).setValues([HEADER_COLUMNS]);
  }
}

function sendInternalNotification_(payload, timestamp) {
  const notifyEmails = getScriptProperty_('NOTIFY_EMAILS');
  if (!notifyEmails) {
    return;
  }

  const subject = 'New RFQ - Altruewit (' + payload.productInterest + ')';
  const body = [
    'A new RFQ was submitted:',
    '',
    'Submitted At: ' + timestamp,
    'Company: ' + payload.companyName,
    'Contact: ' + payload.contactName,
    'Email: ' + payload.businessEmail,
    'Country/Region: ' + payload.countryRegion,
    'Product Interest: ' + payload.productInterest,
    'Estimated Quantity: ' + payload.estimatedOrderQuantity,
    'Requirements:',
    payload.requirementsMessage,
    '',
    'Optional Details:',
    'Website: ' + (payload.companyWebsite || '-'),
    'WhatsApp/Phone: ' + (payload.whatsappPhone || '-'),
    'Target Market: ' + (payload.targetMarket || '-'),
    'Timeline: ' + (payload.timeline || '-'),
    'Customization: ' + (payload.customization || '-'),
    'Source Page: ' + (payload.sourcePage || '-')
  ].join('\n');

  MailApp.sendEmail({
    to: notifyEmails,
    subject: subject,
    body: body,
    replyTo: getReplyTo_()
  });
}

function sendCustomerConfirmation_(payload) {
  if (!payload.businessEmail) {
    return;
  }

  const replyTo = getReplyTo_();
  const subject = 'We received your RFQ - Altruewit';
  const greeting = payload.contactName ? 'Hi ' + payload.contactName + ',' : 'Hello,';
  const body = [
    greeting,
    '',
    'Thank you for your request. We have received your RFQ and will reply within 1 business day.',
    '',
    'If you have additional details, please reply to this email and we will assist you.',
    '',
    'Best regards,',
    'Altruewit Team'
  ].join('\n');

  MailApp.sendEmail({
    to: payload.businessEmail,
    subject: subject,
    body: body,
    replyTo: replyTo
  });
}

function getReplyTo_() {
  return getScriptProperty_('REPLY_TO') || 'summer@altruewit.com';
}

function getTimezone_() {
  return getScriptProperty_('TIMEZONE') || 'Asia/Shanghai';
}

function getScriptProperty_(key) {
  return PropertiesService.getScriptProperties().getProperty(key);
}

function json_(payload, status) {
  const output = ContentService.createTextOutput(JSON.stringify(payload));
  output.setMimeType(ContentService.MimeType.JSON);
  output.setHeader('Access-Control-Allow-Origin', '*');
  output.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  output.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (status) {
    output.setStatusCode(status);
  }
  return output;
}
