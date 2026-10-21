/* Portal AIChE: torna o site instalável e recebe as notificações (Firebase Cloud Messaging). */
try {
  importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js', 'https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
  firebase.initializeApp({
    apiKey: 'AIzaSyAr3GYCeG_BL6rXd_OznCru-2giOkG4DaA',
    authDomain: 'aiche-jeopardy.firebaseapp.com',
    projectId: 'aiche-jeopardy',
    messagingSenderId: '1067257355165',
    appId: '1:1067257355165:web:f9643b0fd8d5157eb3ed74'
  });
  var messaging = firebase.messaging();
  /* com o app fechado ou em segundo plano: mostra o aviso */
  messaging.onBackgroundMessage(function (p) {
    var d = (p && p.data) || {};
    return self.registration.showNotification(d.titulo || 'Portal AIChE', {
      body: d.corpo || '', icon: 'icon-192.png', badge: 'icon-192.png',
      data: { url: d.url || './?app=1', ir: d.ir || '' }, tag: d.ir || undefined, renotify: !!d.ir
    });
  });
} catch (e) { /* sem internet ao instalar: o app funciona, só sem avisos até a próxima abertura */ }
/* tocar no aviso: abre o app (ou traz para a frente) direto no lugar certo */
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var d = e.notification.data || {}, url = d.url || './?app=1';
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (cs) {
    for (var i = 0; i < cs.length; i++) {
      if (cs[i].url.indexOf(self.registration.scope) === 0) { cs[i].postMessage({ aiche: 'ir', ir: d.ir }); return cs[i].focus(); }
    }
    return clients.openWindow(url);
  }));
});
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function () { });
