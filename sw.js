/* Service worker mínimo: faz o celular reconhecer a página como app instalável (com ícone próprio). Não guarda nada. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function () { });
