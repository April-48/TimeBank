/**
 * MSW Browser Setup
 * This sets up the mock service worker for the browser
 */

import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

// Optional: Configure worker behavior
worker.start({
  onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
  serviceWorker: {
    url: '/mockServiceWorker.js'
  }
})

