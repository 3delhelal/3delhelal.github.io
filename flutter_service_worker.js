'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "1db64460df4be0470f30244f1aaf475a",
"assets/AssetManifest.bin.json": "a5ef596ddba2a8044bc239383a26db96",
"assets/AssetManifest.json": "e37d0fd92e891748ab620648e04d74de",
"assets/assets/flags/eg.png": "352af28eb1e5bb7acf802464ec1e3aee",
"assets/assets/flags/es.png": "69bf7c3df4b222c445bf6ebffec278e6",
"assets/assets/flags/uk.png": "aac0dfefc080856931658ea9c760534e",
"assets/assets/fonts/Inter-Regular.ttf": "eba360005eef21ac6807e45dc8422042",
"assets/assets/fonts/Inter-SemiBold.ttf": "3e87064b7567bef4ecd2ba977ce028bc",
"assets/assets/images/profile_image.jpeg": "b0587b48e0a8a70fc716b578a759869c",
"assets/assets/images/profile_image.jpg": "36fb7171f25243259556c4659c48d1f2",
"assets/assets/maintenance.json": "2d361eaa7dd473983c52ee2bffe395f4",
"assets/assets/rive/teddy.riv": "f774c78563243883d1da6e1a21c11b27",
"assets/assets/social_icons/discord.svg": "6995a597cdd72ab6f92586643230f809",
"assets/assets/social_icons/facebook.svg": "a6a36fca4b5a389d0eefbbd3a9c53a7e",
"assets/assets/social_icons/github.svg": "4a4b8675cf9b5c90aad89fe71e670b2d",
"assets/assets/social_icons/instagram.svg": "304fb3151e3b1f86d0150dc8144fcc3c",
"assets/assets/social_icons/linkedin.svg": "f56e6ae60ae1c043ff4803dcdfeeac93",
"assets/assets/social_icons/telegram.svg": "919a6e225ffc16e8543738b5e4bd3694",
"assets/assets/social_icons/x.svg": "549a94c815fb58da319d79837ecb0cc2",
"assets/assets/solidiers.json": "e3eebe983fadcda63435739be70966c1",
"assets/assets/splash.png": "9d321c0f8db6893f2a6409006d163a14",
"assets/assets/thanks.json": "ea9b72314cb3b45d9c567c4144a54de5",
"assets/FontManifest.json": "db7a1cbb3dae4f042ddb0866ed741a4d",
"assets/fonts/MaterialIcons-Regular.otf": "d9bc3bc143455d65018fb1d13aaacbe2",
"assets/NOTICES": "60cfde7130850328498463f7fa6362fc",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"canvaskit/canvaskit.js.symbols": "38cba9233b92472a36ff011dc21c2c9f",
"canvaskit/canvaskit.wasm": "3d2a2d663e8c5111ac61a46367f751ac",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/chromium/canvaskit.js.symbols": "4525682ef039faeb11f24f37436dca06",
"canvaskit/chromium/canvaskit.wasm": "f5934e694f12929ed56a671617acd254",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.js.symbols": "741d50ffba71f89345996b0aa8426af8",
"canvaskit/skwasm.wasm": "e42815763c5d05bba43f9d0337fa7d84",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "c71a09214cb6f5f8996a531350400a9a",
"icons/android-chrome-192x192.png": "7ef533d749dd979c94539efa4099dcc9",
"icons/android-chrome-512x512.png": "71852f0e4f9b332bf7ec6527ca0bec0f",
"icons/apple-touch-icon.png": "76e74bc0dc3ec8866974f33143d6eb70",
"index.html": "e586ae4a4ddf563eec68f80f57530460",
"/": "e586ae4a4ddf563eec68f80f57530460",
"logo.png": "7ef533d749dd979c94539efa4099dcc9",
"main.dart.js": "10f82a9fa531e32aa956e7d0ff9d587f",
"manifest.json": "1fbbe3c853e894eff721f622220fe0c3",
"splash/img/dark-1x.png": "e9b205a4022c345d16fbc867b9dae292",
"splash/img/dark-2x.png": "6f5b6a5aaae3a908b14ea09d3505c334",
"splash/img/dark-3x.png": "36d5e3782fb6a723567da9e511d86f17",
"splash/img/dark-4x.png": "48700564fa4d70f81b3be32271ee5354",
"splash/img/light-1x.png": "e9b205a4022c345d16fbc867b9dae292",
"splash/img/light-2x.png": "6f5b6a5aaae3a908b14ea09d3505c334",
"splash/img/light-3x.png": "36d5e3782fb6a723567da9e511d86f17",
"splash/img/light-4x.png": "48700564fa4d70f81b3be32271ee5354",
"version.json": "ed4196a263a7919322bbf877a1c4ca63"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
