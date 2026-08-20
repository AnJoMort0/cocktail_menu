const CACHE_NAME="andres-bar-offline-v3";
const CORE=["./","./index.html","./styles.css","./menu.js","./app.js","./qr.js","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);if(u.origin!==self.location.origin)return;e.respondWith(fetch(e.request).then(r=>{if(r&&r.ok){const copy=r.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,copy))}return r}).catch(async()=>await caches.match(e.request)||(e.request.mode==="navigate"?caches.match("./index.html"):Promise.reject(new Error("Offline")))))});
