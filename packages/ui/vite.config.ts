import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react(), dts({
        rollupTypes: true,
        tsconfigPath: "./tsconfig.app.json",
    })],
  build: {
    lib: {
      // multiple entries
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
      external: ['react', 'react-dom'], // peer dependencies
      output: {
        // directory structure
        entryFileNames: ({ name }) =>
          name === 'icons' ? 'icons/[name].js' : '[name].js',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});
