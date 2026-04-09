/**
 * Google Apps Script — receives form submissions via GET and appends to Google Sheet.
 *
 * WHY GET: Apps Script web apps redirect POST requests (script.google.com →
 * script.googleusercontent.com), which drops the POST body. GET with URL params
 * is a simple request that arrives intact with no-cors fetch.
 *
 * SETUP:
 * 1. Open the Google Sheet → Extensions → Apps Script
 * 2. Replace Code.gs with this file
 * 3. Deploy → New Deployment (or edit existing → new version)
 *    - Type: Web App  |  Execute as: Me  |  Who has access: Anyone
 * 4. Paste the Web App URL into js/main.js as GOOGLE_SCRIPT_URL
 */

var SPREADSHEET_ID = '1ssMPb2JpVd2_TE16cJs5hCfhznBBKiyEXpJF0sNjbPc';
var SHEET_GID      = 1199371896;

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

function getTargetSheet() {
  var ss     = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() === SHEET_GID) return sheets[i];
  }
  return ss.getSheets()[0]; // fallback to first sheet
}

function formatTimestamp(isoString) {
  try {
    return Utilities.formatDate(new Date(isoString), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
  } catch (e) {
    return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
  }
}

/* ─── Main endpoint (GET with query params) ────────────────────────────────── */

function doGet(e) {
  var p = e.parameter || {};

  // If this looks like a form submission, write it to the sheet
  if (p.email) {
    try {
      getTargetSheet().appendRow([
        formatTimestamp(p.timestamp),  // Timestamp
        p.firstName || '',             // First Name
        p.lastName  || '',             // Last Name
        p.email     || '',             // Email Address
        p.company   || '',             // Company
        p.website   || '',             // Company Website
        p.message   || ''             // Tell Me About Your Project
      ]);
      Logger.log('Row appended for: ' + p.email);
    } catch (err) {
      Logger.log('appendRow error: ' + err.message);
    }
  }

  // Always return 200 — no-cors can't read the response anyway
  return ContentService
    .createTextOutput('ok')
    .setMimeType(ContentService.MimeType.TEXT);
}

/* ─── Legacy POST handler (kept as fallback) ───────────────────────────────── */

function doPost(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    if (!p.email && e.postData && e.postData.contents) {
      p = JSON.parse(e.postData.contents);
    }
    getTargetSheet().appendRow([
      formatTimestamp(p.timestamp), p.firstName || '', p.lastName || '',
      p.email || '', p.company || '', p.website || '', p.message || ''
    ]);
  } catch (err) {
    Logger.log('doPost error: ' + err.message);
  }
  return ContentService.createTextOutput('ok').setMimeType(ContentService.MimeType.TEXT);
}
