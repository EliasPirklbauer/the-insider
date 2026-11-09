/* The Insider – Service Worker. Build 2026.11.09 */
const BUILD="2026.11.09",CACHE="insider-"+BUILD,FONTS="insider-fonts";
const SHELL=["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "icons/apple-touch-icon.png", "pl/0.json", "pl/1.json", "pl/10.json", "pl/11.json", "pl/12.json", "pl/13.json", "pl/14.json", "pl/15.json", "pl/16.json", "pl/17.json", "pl/18.json", "pl/19.json", "pl/2.json", "pl/20.json", "pl/21.json", "pl/22.json", "pl/23.json", "pl/24.json", "pl/25.json", "pl/26.json", "pl/27.json", "pl/28.json", "pl/29.json", "pl/3.json", "pl/30.json", "pl/31.json", "pl/32.json", "pl/33.json", "pl/34.json", "pl/35.json", "pl/36.json", "pl/37.json", "pl/38.json", "pl/39.json", "pl/4.json", "pl/40.json", "pl/41.json", "pl/42.json", "pl/43.json", "pl/44.json", "pl/45.json", "pl/46.json", "pl/47.json", "pl/48.json", "pl/49.json", "pl/5.json", "pl/50.json", "pl/51.json", "pl/52.json", "pl/53.json", "pl/54.json", "pl/55.json", "pl/56.json", "pl/57.json", "pl/58.json", "pl/59.json", "pl/6.json", "pl/60.json", "pl/61.json", "pl/62.json", "pl/63.json", "pl/7.json", "pl/8.json", "pl/9.json", "pl/meta.json"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)))});
self.addEventListener("activate",e=>{e.waitUntil((async()=>{
  for(const k of await caches.keys())if(k.startsWith("insider-")&&k!==CACHE&&k!==FONTS)await caches.delete(k);
  await self.clients.claim();
})())});
self.addEventListener("message",e=>{if(e.data&&e.data.t==="SKIP")self.skipWaiting()});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;
  const u=new URL(r.url);
  if(u.origin===location.origin){
    e.respondWith((async()=>{
      const c=await caches.open(CACHE);
      const hit=await c.match(r,{ignoreSearch:true})||(r.mode==="navigate"?await c.match("index.html"):null);
      if(hit)return hit;
      try{const res=await fetch(r);if(res&&res.ok)c.put(r,res.clone());return res}
      catch(err){if(r.mode==="navigate"){const f=await c.match("index.html");if(f)return f}throw err}
    })());
    return;
  }
  if(/(^|\.)(googleapis|gstatic)\.com$/.test(u.hostname)){
    e.respondWith((async()=>{
      const c=await caches.open(FONTS),hit=await c.match(r);
      const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==="opaque"))c.put(r,res.clone());return res}).catch(()=>hit);
      return hit||net;
    })());
  }
});
