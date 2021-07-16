/* eslint-disable prefer-regex-literals */
import 'regenerator-runtime/runtime'
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute'
import { cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { clientsClaim, setCacheNameDetails } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import CONFIG from './globals/config'
import API_ENDPOINT from './globals/api-endpoint'

self.skipWaiting()

clientsClaim()

setCacheNameDetails({
  prefix: CONFIG.CACHE_NAME
})

precacheAndRoute([
  { url: './', revision: '1' }, // alias for index.html
  { url: 'https://fonts.googleapis.com/css2?family=Lobster&family=Pacifico&family=Spartan:wght@100;200;300;400;500;600;700;800;900&display=swap', revision: '1' },
  { url: 'https://use.fontawesome.com/releases/v5.15.3/css/all.css', revision: '1' },
  { url: './images/no-connection.webm', revision: '1' },
  { url: './images/no-connection.mp4', revision: '1' },
  { url: './images/not-found.webm', revision: '1' },
  { url: './images/not-found.mp4', revision: '1' },
  { url: './images/toasteruwu.webm', revision: '1' },
  { url: './images/toasteruwu.mp4', revision: '1' }
], { ignoreURLParametersMatching: [/.*/] })

// Using StaleWhileRevalidate strategy for API (JSON OF /LIST)
registerRoute(
  ({ url }) => url.origin === 'https://dicoding-restaurant-api.el.r.appspot.com' &&
               url.pathname.startsWith('/list'),
  new StaleWhileRevalidate({
    cacheName: ` ${CONFIG.CACHE_NAME} Home `,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 265 // 265 Hari
      })
    ]
  })
)

// Using StaleWhileRevalidate strategy for API (LIST OF IMAGES MEDIUM)
registerRoute(
  ({ url }) => url.origin === 'https://restaurant-api.dicoding.dev' &&
             url.pathname.startsWith('/images/medium/'),
  new StaleWhileRevalidate({
    cacheName: ` ${CONFIG.CACHE_NAME} Image `,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 265 // 265 Hari
      })
    ]
  })
)

registerRoute(
  new RegExp(API_ENDPOINT.DETAIL),
  new CacheFirst({
    cacheName: ` ${CONFIG.CACHE_NAME} Detail `,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 265 // 265 Hari
      })
    ]
  })
)

registerRoute(
  new RegExp('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'),
  new CacheFirst({
    cacheName: 'FontAwesome',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 265 // 265 Hari
      })
    ]
  })
)
cleanupOutdatedCaches()
