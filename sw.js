const CACHE='abcs-shell-v1';
const CORE=["./", "./index.html", "./about.html", "./privacy.html", "./terms.html", "./disclaimer.html", "./contact.html","./404.html", "./css/app.css", "./css/studio.css", "./js/app.js", "./js/ui.js", "./js/i18n.js", "./js/editor.js", "./js/export.js", "./js/render.js", "./js/store.js", "./js/state.js", "./js/pages.js", "./js/pages-data.js", "./js/templates/index.js", "./js/templates/core.js", "./js/templates/dsl.js", "./js/templates/student.js", "./js/templates/employee.js", "./js/templates/institutional.js", "./vendor/qrcode.js", "./vendor/pdf-lib.min.js", "./vendor/jszip.min.js", "./assets/aroundbyte-mark.png", "./assets/fonts/NotoSansArabic-Regular.ttf", "./assets/fonts/NotoSansArabic-Medium.ttf", "./assets/fonts/space-grotesk-latin-500-normal.woff2", "./assets/fonts/Inter-Regular.ttf", "./assets/fonts/OFL-1.1.txt", "./assets/fonts/NotoSansArabic-Bold.ttf", "./assets/fonts/playfair-display-latin-600-normal.woff2", "./assets/fonts/NotoSansArabic-SemiBold.ttf", "./assets/fonts/playfair-display-latin-700-normal.woff2", "./assets/fonts/space-grotesk-latin-700-normal.woff2", "./assets/fonts/Inter-Medium.ttf", "./assets/fonts/Inter-Bold.ttf", "./assets/fonts/Inter-SemiBold.ttf"];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('abcs-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin)return;
 if(req.mode==='navigate'){
  event.respondWith(fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return res;}).catch(async()=>await caches.match(req)||await caches.match('./index.html')));
  return;
 }
 event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return res;})));
});
