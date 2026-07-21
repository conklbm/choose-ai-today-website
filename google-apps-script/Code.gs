/**
 * Choose AI Today — form intake webhook.
 *
 * Receives POSTs from the site's Next.js API routes and appends a row to the
 * matching tab. Deploy as a Web App (see SETUP-TODO.md), then put the
 * deployment URL in the site's SHEET_WEBHOOK_URL env var.
 *
 * Expected payload:
 *   { formType: "community", name, email, source }
 *   { formType: "lead", name, email, company, needs, timeline, source }
 */

var TABS = {
  community: "Community",
  lead: "Leads",
};

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var tabName = TABS[data.formType];
    if (!tabName) {
      return jsonResponse({ ok: false, error: "Unknown formType" });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tabName);
    if (!sheet) {
      return jsonResponse({ ok: false, error: "Tab not found: " + tabName });
    }

    var timestamp = new Date();
    if (data.formType === "community") {
      sheet.appendRow([timestamp, data.name, data.email, data.source]);
    } else {
      sheet.appendRow([
        timestamp,
        data.name,
        data.email,
        data.company || "",
        data.needs || "",
        data.timeline || "",
        data.source,
      ]);
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
