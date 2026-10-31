import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "FaithSteps",
        short_name: "FaithSteps",
        description: "Read. Reflect. Grow.",
        theme_color: "#b08a43",
        background_color: "#f7f3eb",
        display: "standalone",
        start_url: "/"
      },
      workbox: {
        runtimeCaching: [
          {
            // Optional pre-generated static JSON files on your own host/CDN.
            urlPattern: /\/bible-data\/.*\.json$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "faithsteps-static-bible",
              expiration: { maxEntries: 1600, maxAgeSeconds: 60 * 60 * 24 * 180 }
            }
          },
          {
            // Live API fallback; IndexedDB remains the primary offline store.
            urlPattern: /^https:\/\/bible-api\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "faithsteps-bible-api",
              networkTimeoutSeconds: 8,
              expiration: { maxEntries: 1500, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          },
          {
            // Cache Telugu source book JSON when it is fetched from GitHub.
            urlPattern: /^https:\/\/raw\.githubusercontent\.com\/aruljohn\/Bible-telugu\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "faithsteps-telugu-source",
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 180 }
            }
          }
        ]
      }
    })
  ]
});
