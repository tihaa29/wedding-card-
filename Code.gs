// Google Apps Script — sambungkan dengan Google Sheet anda
// 1. Buka script.google.com dan cipta projek baru.
// 2. Tampal kod ini.
// 3. Jalankan setupSheet() SEKALI dan beri kebenaran.
// 4. Deploy > New deployment > Web app.
//    Execute as: Me
//    Who has access: Anyone
// 5. Salin URL Web App ke script.js.

const SHEET_NAME = "Ucapan";
const SPREADSHEET_ID = ""; // BOLEH BIARKAN KOSONG JIKA SCRIPT DICIPTA DARIPADA GOOGLE SHEET

function getSheet(){
  if(SPREADSHEET_ID){
    const ss=SpreadsheetApp.openById(SPREADSHEET_ID);
    return ss.getSheetByName(SHEET_NAME)||ss.insertSheet(SHEET_NAME);
  }
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME)||ss.insertSheet(SHEET_NAME);
}

function setupSheet(){
  const sh=getSheet();
  if(sh.getLastRow()===0) sh.appendRow(["Tarikh & Masa","Nama","Ucapan"]);
  sh.setFrozenRows(1);
}

function doPost(e){
  try{
    const data=JSON.parse(e.postData.contents);
    const sh=getSheet();
    if(sh.getLastRow()===0) sh.appendRow(["Tarikh & Masa","Nama","Ucapan"]);
    sh.appendRow([new Date(),data.name||"",data.message||""]);
    return ContentService.createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);
  }catch(err){
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(){
  return ContentService.createTextOutput("Sistem ucapan Fatihah & Solehuddin aktif.");
}