const cover=document.getElementById("cover"),nav=document.getElementById("nav"),loader=document.getElementById("loader");
window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("hide"),1000));

let ytPlayer, musicStarted=false;
function onYouTubeIframeAPIReady(){
  ytPlayer=new YT.Player("youtubeMusic",{height:"1",width:"1",videoId:"NS8U20TsAz4",playerVars:{autoplay:0,controls:0,disablekb:1,fs:0,loop:1,playlist:"NS8U20TsAz4",rel:0,playsinline:1},events:{onReady:()=>{}}});
}
const ytTag=document.createElement("script");ytTag.src="https://www.youtube.com/iframe_api";document.head.appendChild(ytTag);

document.getElementById("openInvitation").addEventListener("click",()=>{
 cover.classList.add("open");nav.classList.add("show");document.body.classList.remove("locked");
 setTimeout(()=>document.getElementById("utama").scrollIntoView({behavior:"smooth"}),450);
 setTimeout(()=>{try{ytPlayer.playVideo();musicStarted=true;document.getElementById("musicButton").textContent="Ⅱ"}catch(e){}},650);
});

document.getElementById("musicButton").addEventListener("click",()=>{
 if(!ytPlayer)return;
 try{
   if(!musicStarted || ytPlayer.getPlayerState()!==YT.PlayerState.PLAYING){
     ytPlayer.playVideo();musicStarted=true;document.getElementById("musicButton").textContent="Ⅱ";
   }else{
     ytPlayer.pauseVideo();document.getElementById("musicButton").textContent="♫";
   }
 }catch(e){}
});

const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("active")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

/* Tampal URL Google Apps Script Web App di bawah selepas deploy. */
const WISH_API_URL="PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_DI_SINI";
async function sendToSheet(data,status,form){
 if(WISH_API_URL.startsWith("PASTE_")){status.textContent="Sistem ini belum disambungkan ke Google Sheet.";return;}
 status.textContent="Sedang dihantar...";
 try{
   await fetch(WISH_API_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(data)});
   form.reset();status.textContent=data.type==="attendance"?"Terima kasih atas pengesahan anda ♡":"Terima kasih atas ucapan dan doa anda ♡";
 }catch(err){status.textContent="Maaf, maklumat tidak dapat dihantar. Sila cuba lagi."}
}

const attendanceForm=document.getElementById("attendanceForm");
attendanceForm.addEventListener("submit",e=>{
 e.preventDefault();
 sendToSheet({type:"attendance",name:document.getElementById("attendanceName").value.trim(),attendance:document.querySelector('input[name="attendance"]:checked').value},
 document.getElementById("attendanceStatus"),attendanceForm);
});

const wishForm=document.getElementById("wishForm");
wishForm.addEventListener("submit",e=>{
 e.preventDefault();
 sendToSheet({type:"wish",name:document.getElementById("wishName").value.trim(),message:document.getElementById("wishMessage").value.trim()},
 document.getElementById("wishStatus"),wishForm);
});