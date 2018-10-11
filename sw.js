//Asignar nombre y version de cache
const CACHE_NAME = 'v1_cache_jct_pwa';

//Ficheros a cachear en la aplicacion
var urlsToCache = [
    './',
    './css/styles.css',
    './img/favicon.png',
    './img/about.png',
    './img/logo.png',
    './img/fondoBotones/fondoFace.png',
    './img/fondoBotones/fondoFutbol.png',
    './img/fondoBotones/fondoGolf.png',
    './img/fondoBotones/fondoHipico.png',
    './img/fondoBotones/fondoHockey.png',
    './img/fondoBotones/fondoInsta.png',
    './img/fondoBotones/fondoInstitucional.png',
    './img/fondoBotones/fondoMagazine.png',
    './img/fondoBotones/fondoRugby.png',
    './img/fondoBotones/fondoTenis.png',
    './img/fondoBotones/fondoTwitter.png',
    './img/fondoBotones/fondoYoutube.png',
    './img/iconos/separador.png',
    './img/intro-carousel/1.png',
    './img/intro-carousel/2.png',
    './img/intro-carousel/3.png',
    './img/intro-carousel/4.png',
    './img/intro-carousel/5.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png',
];

//Evento Install
//Instalacion del service worker y guardar en cache los recursos estaticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache => {
                  return cache.addAll(urlsToCache)
                              .then(() => {
                                  self.skipWaiting();
                              });              
              })
              .catch(err => console.log('No se ha registrado el cache', err))
    );
});

//Evento Activate
//Que la app funcione sin conexion
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
              .then(cacheNames => {
                  return Promise.all(
                      cacheNames.map(cacheName => {

                          if(cacheWhitelist.indexOf(cacheName) === -1){
                                //Borrar elemntos que no se necesitan
                                return caches.delete(cacheName);
                          }
                      })
                  );
              })
              .then(() => {
                  //Activar cache
                  self.clients.claim();
              })
    );
});

//Evento fetch
self.addEventListener('fetch', e => {

    e.respondWith(
        caches.match(e.request)
              .then(res => {
                  if(res){
                      //Devuelvo datos desde cache
                      return res;
                  }
                  return fetch(e.request);
              })
    );
});