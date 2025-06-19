import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react(), dts({
    insertTypesEntry: true,
    rollupTypes: true,     
    outDir: 'dist/types',
    entryRoot: 'src',
    tsconfigPath: path.resolve(__dirname, 'tsconfig.app.json')
  })],
  build: {
    lib: {
      entry: {
        lib: path.resolve(__dirname, 'src/index.ts'),
        icons: path.resolve(__dirname, 'src/icons/index.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        return entryName === 'icons'
          ? `icons/index.${format}.js`
          : `index.${format}.js`;
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom'], 
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});
