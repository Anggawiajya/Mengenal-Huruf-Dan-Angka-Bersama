const CACHE_NAME = 'tebak-huruf-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/home.html',
    '/tebak anka.html',
    '/tebak abc.html',
    '/vd-abc.html',
    '/vd-angka.html',
    '/tambah.html',
    //css
    '/asset/css/vd-abc.css',
    '/asset/css/style.css',
    //video
    '/asset/video/abc.mp4',
    '/asset/video/angka mp4',
    //img
    '/asset/img/logo3.jpeg',
    '/asset/img/bg-abc.jpeg',
    '/asset/img/bg-angka.jpeg',
    '/asset/img/logo.png',
    '/asset/img/logo1.jpeg',
    '/asset/img/logo2.png',
    //audio
    '/asset/audio/start.mp3',
    '/asset/audio/hore.mp3',
    '/assetaudio/salah.mp3',
    //java
    '/asset/js/cc.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
    }).catch(error => {
        console.log('Service Worker registration failed:', error);
    });
}

//ld
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading');
    const content = document.getElementById('content');

    setTimeout(function() {
        loadingScreen.style.display = 'none';
        content.style.display = 'block';
    }, 3000); // Sesuaikan durasi loading sesuai kebutuhan
});



/*rt*/
window.addEventListener('orientationchange', function() {
  if (window.orientation === 90 || window.orientation === -90) {
    // Layar sudah dalam mode landscape
    document.getElementById('content').style.display = 'block';
  } else {
    // Jika tidak, berikan instruksi untuk memutar perangkat
    //alert('Silakan putar perangkat Anda ke mode landscape //untuk pengalaman terbaik.');
  }
});

// Cek orientasi saat pertama kali dimuat
if (window.orientation === 90 || window.orientation === -90) {
  document.getElementById('content').style.display = 'block';
} else {
  //alert('Silakan putar perangkat Anda ke mode landscape //untuk pengalaman terbaik.');
}