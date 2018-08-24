self.addEventListener('install', function(event){
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
self.addEventListener('fetch',function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
        if(response) return response;
        return fetch(event.request);
        })
    );
})
self.addEventListener('activate',function(event){

})