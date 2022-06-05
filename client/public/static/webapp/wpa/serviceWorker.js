const staticDevCoffee = "diary"
const assets = [
  "/",
  "/index.html",
  "/about.html",
  "/css/w3.css",
  "/css/css.css",
  "/css/style.css",
  "/js/index.js",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})
