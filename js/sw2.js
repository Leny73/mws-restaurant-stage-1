var CACHE = 'RestaurantReviews-v1';
var data =[
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
  ];

self.addEventListener('install', function(event){
    console.log('The service worker is being installed');

    event.waitUntil(caches.open(CACHE).then(function(cache){
        cache.addAll(data);
        }).catch('Failed to install')
    );
});

self.addEventListener('fetch', function(event) {
    console.log('The service worker is serving the asset');
    event.respondWith(fromCache(event.request));

    event.waitUntil(update(event.request).then(refresh));
});
    

self.addEventListener('activate',function(event){
    console.log('Service worker has been activated');
})

function fromCache(request){
    return caches.open(CACHE).then(function(cache){
        return cache.match(request);
    });
}

function update(request){
    return caches.open(CACHE).then(function(cache){
        return fetch(request).then(function(response){
            return cache.put(request,response.clone()).then(function(){
                return response;
            });
        });
    });
}

function refresh(response){
    return self.clients.matchAll().then(function(clients){
        clients.forEach(function(client){
            var message ={
                type:'refresh',
                url: response.url,
                eTag: response.headers.get('ETag')
            };

            client.postMessage(JSON.stringify(message));
        })
    })
}