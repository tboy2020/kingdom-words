// network-first for HTML so updates always land; cache assets
var C='kw-v1';
self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C;}).map(function(x){return caches.delete(x);}));}));self.clients.claim();});
self.addEventListener('fetch',function(e){
  var req=e.request; if(req.method!=='GET')return;
  if(req.mode==='navigate'||(req.headers.get('accept')||'').indexOf('text/html')>-1){
    e.respondWith(fetch(req).then(function(r){var c=r.clone();caches.open(C).then(function(ca){ca.put(req,c);});return r;}).catch(function(){return caches.match(req);}));
    return;
  }
  e.respondWith(caches.match(req).then(function(m){return m||fetch(req).then(function(r){var c=r.clone();caches.open(C).then(function(ca){ca.put(req,c);});return r;});}));
});
