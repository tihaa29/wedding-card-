const cover=document.getElementById("cover"),nav=document.getElementById("nav"),loader=document.getElementById("loader");
window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("hide"),1000));
document.getElementById("openInvitation").addEventListener("click",()=>{cover.classList.add("open");nav.classList.add("show");document.body.classList.remove("locked");setTimeout(()=>document.getElementById("utama").scrollIntoView({behavior:"smooth"}),450);});
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("active")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const music=document.getElementById("bgMusic"),musicButton=document.getElementById("musicButton");
musicButton.addEventListener("click",async()=>{try{if(music.paused){await music.play();musicButton.textContent="Ⅱ"}else{music.pause();musicButton.textContent="♫"}}catch(e){alert("Sila pastikan fail muzik bernama music.mp3 telah dimasukkan ke dalam repository.");}});

/*
  WISHES:
  1. Cipta Google Sheet + Apps Script menggunakan fail Code.gs yang disertakan.
  2. Deploy sebagai Web App.
  3. Tampal URL deployment di bawah.
*/
const WISH_API_URL="PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_DI_SINI";

const form=document.getElementById("wishForm"),status=document.getElementById("wishStatus");
form.addEventListener("submit",async e=>{
 e.preventDefault();
 if(WISH_API_URL.startsWith("PASTE_")){
   status.textContent="Sistem ucapan belum disambungkan lagi.";
   return;
 }
 const name=document.getElementById("wishName").value.trim();
 const message=document.getElementById("wishMessage").value.trim();
 status.textContent="Sedang mengirim ucapan...";
 try{
   await fetch(WISH_API_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({name,message})});
   form.reset();status.textContent="Terima kasih atas ucapan dan doa anda ♡";
 }catch(err){status.textContent="Maaf, ucapan tidak dapat dikirim. Sila cuba lagi."}
});