// Google Apps Script — simpan KEHADIRAN dan UCAPAN dalam Google Sheet
const SHEET_NAME = "Wedding Responses";
const SPREADSHEET_ID = ""; // Jika script dibuka dari Google Sheet, biarkan kosong.

function getSheet(){
  const ss = SPREADSHEET_ID ? SpreadsheetApp.openById(SPREADSHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

function setupSheet(){
  const sh=getSheet();
  if(sh.getLastRow()===0) sh.appendRow(["Tarikh & Masa","Jenis","Nama","Kehadiran","Ucapan"]);
  sh.setFrozenRows(1);
}

function doPost(e){
  try{
    const data=JSON.parse(e.postData.contents);
    const sh=getSheet();
    if(sh.getLastRow()===0) sh.appendRow(["Tarikh & Masa","Jenis","Nama","Kehadiran","Ucapan"]);
    sh.appendRow([
      new Date(),
      data.type || "",
      data.name || "",
      data.attendance || "",
      data.message || ""
    ]);
    return ContentService.createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);
  }catch(err){
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(){
  return ContentService.createTextOutput("Sistem kehadiran dan ucapan Fatihah & Solehuddin aktif.");
}