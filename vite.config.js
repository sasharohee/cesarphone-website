import { defineConfig } from 'vite'

export default defineConfig({
  // Configuration de base
  root: '.',
  
  // Configuration du serveur de développement
  server: {
    port: 3000,
    open: true,
    host: true
  },
  
  // Configuration du build
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vite']
        }
      }
    }
  },
  
  // Optimisations
  optimizeDeps: {
    include: []
  },
  
  // Configuration CSS
  css: {
    devSourcemap: true
  },
  
  // Configuration des assets
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],
  
  // Configuration de preview
  preview: {
    port: 3000,
    host: true
  }
})
