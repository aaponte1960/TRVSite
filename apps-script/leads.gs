/**
 * Webhook de Google Sheets para las solicitudes del funnel de Certificación TRV.
 *
 * Instalación:
 * 1. Cree una Google Sheet llamada "Solicitudes Certificación TRV".
 * 2. Extensiones → Apps Script → pegue este archivo.
 * 3. Configuración del proyecto → Propiedades de la secuencia de comandos → agregue
 *    WEBHOOK_SECRET = (una clave larga; la misma que SHEETS_WEBHOOK_SECRET en Vercel).
 * 4. Implementar → Nueva implementación → Tipo: Aplicación web
 *    Ejecutar como: Yo · Quién tiene acceso: Cualquier usuario → Implementar.
 * 5. Copie la URL /exec y guárdela como SHEETS_WEBHOOK_URL en Vercel y en .env.local.
 */

var COLUMNS = [
  'fecha', 'perfil', 'nombre', 'rol', 'email', 'telefono', 'iglesia', 'ubicacion',
  'certificacion', 'modalidad', 'participantes', 'inicio', 'mensaje', 'diagnostico',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'estado'
];

function doPost(e) {
  var payload = JSON.parse(e.postData.contents || '{}');
  var secret = PropertiesService.getScriptProperties().getProperty('WEBHOOK_SECRET') || '';
  if (secret && payload.secret !== secret) {
    return json_({ ok: false, error: 'unauthorized' });
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Solicitudes')
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Solicitudes');
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
  }

  var lead = payload.lead || {};
  lead.estado = 'Nuevo';
  sheet.appendRow(COLUMNS.map(function (c) { return lead[c] || ''; }));
  return json_({ ok: true });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
