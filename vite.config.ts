import { resolve } from 'path';
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'index',
      name: 'day-n-nite'
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        dir: resolve(__dirname, 'dist'),
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
});
