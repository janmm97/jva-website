/**
 * Google Apps Script — receives form submissions and appends them to a Google Sheet.
 *
 * SETUP:
 * 1. Open the Google Sheet linked below (or go via Extensions → Apps Script inside it)
 *    https://docs.google.com/spreadsheets/d/1ssMPb2JpVd2_TE16cJs5hCfhznBBKiyEXpJF0sNjbPc/edit
 * 2. Go to Extensions → Apps Script
 * 3. Replace everything in Code.gs with this file
 * 4. Click Deploy → New Deployment
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Authorise when prompted, then copy the Web App URL
 * 6. Paste that URL into js/main.js, replacing the placeholder:
 *    const GOOGLE_SCRIPT_URL = '<paste here>';
 *
 * To update the script later: Deploy → Manage Deployments → edit the existing one.
 */

var SPREADSHEET_ID = '1ssMPb2JpVd2_TE16cJs5hCfhznBBKiyEXpJF0sNjbPc';
var SHEET_GID      = 1199371896;

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function getTargetSheet() {
  var ss     = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() === SHEET_GID) return sheets[i];
  }
  // Fallback: first sheet (should never hit this)
  return ss.getSheets()[0];
}

function formatTimestamp(isoString) {
  try {
    var d = new Date(isoString);
    return Utilities.formatDate(d, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
  } catch (e) {
    return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
  }
}

/* ─── Main endpoint ────────────────────────────────────────────────────────── */

function doPost(e) {
  try {
    var raw  = e.postData && e.postData.contents ? e.postData.contents : '{}';
    var data = JSON.parse(raw);

    var sheet = getTargetSheet();

    sheet.appendRow([
      formatTimestamp(data.timestamp),   // Timestamp
      data.firstName  || '',             // First Name
      data.lastName   || '',             // Last Name
      data.email      || '',             // Email Address
      data.company    || '',             // Company
      data.website    || '',             // Company Website
      data.message    || ''              // Tell Me About Your Project
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Log the error for debugging in Apps Script's Execution Log
    Logger.log('doPost error: ' + err.message);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/* ─── Health check (GET) ───────────────────────────────────────────────────── */

function doGet() {
  return ContentService
    .createTextOutput('Jan Website — form endpoint is active.')
    .setMimeType(ContentService.MimeType.TEXT);
}
