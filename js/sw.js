
self.addEventListener('install', function(event){
    console.log('The service worker is being installed');
    event.waitUntil(
        caches.open('RestaurantReviews-v1').then(function(cache){
            console.log('Cache loaded');
            return cache.addAll([
                '/',
                '/css/styles.css',
                '/js/main.js',
                '/js/sw.js',
                '/js/restaurant_info.js',
                '/js/dbhelper.js',
                  '/index.html',
                  '/restaurant.html',
                  '/img/10.jpg',
                  '/img/1.jpg',
                  '/img/2.jpg',
                  '/img/3.jpg',
                  '/img/4.jpg',
                  '/img/5.jpg',
                  '/img/6.jpg',
                  '/img/7.jpg',
                  '/img/8.jpg',
                  '/img/9.jpg',
                  '/data/restaurants.json'
              ]);
        }).catch('Failed to cache')
    );
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.open('RestaurantReviews-v1').then(function(cache) {
        return cache.match(event.request).then(function (response) {
          return response || fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  });
self.addEventListener('activate',function(event){
    console.log('Service worker has been activated');
})