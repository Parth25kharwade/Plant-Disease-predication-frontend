import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,        // ✅ Fix the port to 5173
    open: true,         // ✅ Automatically open browser on start
    strictPort: true,   // ✅ Fail if port is already in use (no auto-switch)
proxy: {
      '/api': {
        target: 'http://localhost:8080', // Backend server URL
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.error(`❌ Backend connection failed for ${req.url}:`, err.message);
            console.error('💡 Make sure your backend server is running on http://localhost:8080');
            
            // Send a proper error response instead of crashing
            if (!res.headersSent) {
              res.writeHead(503, { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
              });
              res.end(JSON.stringify({ 
                error: 'Backend connection failed', 
                message: 'Cannot connect to backend server on port 8080. Please ensure the backend is running.',
                code: 'BACKEND_UNAVAILABLE',
                timestamp: new Date().toISOString()
              }));
            }
          });
          
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log(`🔄 Proxying ${req.method} ${proxyReq.path} → http://localhost:8080`);
          });
          
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log(`✅ Response ${proxyRes.statusCode} for ${req.url}`);
          });
        }
      }
    }
  },
  preview: {
    port: 4173,         // ✅ Optional: Fix preview port too
  },
})
