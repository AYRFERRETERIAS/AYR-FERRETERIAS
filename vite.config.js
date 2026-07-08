import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Las carpetas de fotos (public/IMAGENES PRODUCTOS, public/fotos de
      // portada) se van llenando a mano mientras el server corre; en Windows
      // eso puede dejar un archivo momentáneamente bloqueado (OneDrive, el
      // Explorador) y el watcher de Vite se cae con EBUSY. En vez de ignorar
      // esas carpetas por completo (eso hacía que Vite no "viera" fotos
      // agregadas/reemplazadas después de arrancar, sirviendo el HTML de
      // fallback en su lugar), se le pide al watcher que espere a que el
      // archivo termine de escribirse antes de considerarlo listo.
      awaitWriteFinish: {
        stabilityThreshold: 300,
        pollInterval: 100,
      },
    },
  },
})
