import react from "@vitejs/plugin-react";
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'index',
      // the proper extensions will be added
      fileName: 'index'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  esbuild: {
    // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    react({
      babel: {
        plugins: ['babel-plugin-macros', 'babel-plugin-styled-components'],
      },
    }),
    viteTsconfigPaths()
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss('./tailwind.config.cjs'),
      ],
    },
  }
});
