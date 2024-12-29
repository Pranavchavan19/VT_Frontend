// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': 'https://vt-backend.onrender.com'
//     }
//   }
// })

// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://vt-backend.onrender.com/api/v1',
        // changeOrigin: true, // Ensures that the Origin header is set correctly
        // secure: true, // Set to false if your backend is using self-signed certificates
        // rewrite: (path) => path.replace(/^\/api/, '') // Strips "/api" from the request path
      }
    }
  }
})
