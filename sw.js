const PREFIX='sichuan-ev-'+encodeURIComponent(self.registration.scope)+'-';
const CACHE=PREFIX+'v04-1';
const FILES=['./','./index.html','./styles.css','./app.js','./data.js','./routes.js','./route-engine.js','./vendor/maplibre-gl.js','./vendor/maplibre-gl.css','./icon.svg','./manifest.webmanifest','./data/chargers.csv'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;e.respondWith(caches.open(CACHE).then(async c=>{const cached=await c.match(e.request);if(cached)return cached;return fetch(e.request)}));});
