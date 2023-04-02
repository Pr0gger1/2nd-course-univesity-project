const staticCash = 'productify'

// const assets = [

// ]

// self.addEventListener('install', async e => {
//     const cache = await caches.open(staticCash);
//     await cache.addAll(assets)
// });
self.addEventListener('activate', async e => {
    const allCache = await caches.keys();
    await Promise.all(
        allCache
            .filter(name => name !== staticCash)
            .map(name => caches.delete(name))
    ) 
});
self.addEventListener('fetch', e => {
    e.respondWith(loadCache(e.request))
});

async function loadCache (request) {
    return await caches.match(request) ?? await fetch(request)
}