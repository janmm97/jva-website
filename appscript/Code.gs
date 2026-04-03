/**
 * Google Apps Script — receives form submissions and appends them to a Google Sheet.
 *
 * SETUP:
 * 1. Open the Google Sheet: https://docs.google.com/spreadsheets/d/1ssMPb2JpVd2_TE16cJs5hCfhznBBKiyEXpJF0sNjbPc/edit
 * 2. Go to Extensions → Apps Script
 * 3. Paste this code into Code.gs
 * 4. Click Deploy → New Deployment → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL and paste it into js/main.js (replace YOUR_SCRIPT_ID)
 */

function doPost(e) {
  var sheet = SpreadsheetApp.openById('1ssMPb2JpVd2_TE16cJs5hCfhznBBKiyEXpJF0sNjbPc').getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp,
    data.firstName,
    data.lastName,
    data.email,
    data.company,
    data.website,
    data.message
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService
    .createTextOutput('Form endpoint is active.')
    .setMimeType(ContentService.MimeType.TEXT);
}
