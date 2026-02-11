import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Toutes les pages HTML du site (hors templates / test)
const htmlEntries = [
  'index.html',
  'contact.html',
  'a-propos.html',
  'zone-intervention.html',
  'cgv.html',
  'politique-confidentialite.html',
  'mentions-legales.html',
  'services/degats-eaux.html',
  'services/reparation-audio.html',
  'services/reparation-batterie.html',
  'services/reparation-camera.html',
  'services/reparation-ecran.html',
  'services/reparation-port-charge.html',
  'villes/reparation-telephone-aubusson.html',
  'villes/reparation-telephone-gueret.html',
  'villes/reparation-telephone-la-souterraine.html',
  'villes/reparation-telephone-maison-feyne.html'
]

export default defineConfig({
  // Configuration de base
  root: '.',
  
  // Configuration du serveur de développement
  server: {
    port: 3000,
    open: true,
    host: true
  },
  
  // Configuration du build (multi-pages)
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      input: Object.fromEntries(
        htmlEntries.map((entry) => [
          entry.replace(/\.html$/, '').replace(/\//g, '-'),
          path.resolve(__dirname, entry)
        ])
      ),
      external: ['fsevents'],
      output: {
        manualChunks: undefined
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
