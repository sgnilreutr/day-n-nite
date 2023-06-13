import react from "@vitejs/plugin-react";
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // outDir: 'dist',
    // emptyOutDir: false,
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

// css: {
//   postcss: {
//     plugins: [
//       tailwindcss('./tailwind.config.cjs'),
//     ],
//   },
// }

// const banner = require("rollup-plugin-banner2");

// // TSDX docs: https://tsdx.io/customization
// module.exports = {
//   // Rollup docs: https://rollupjs.org/guide/en/#rolluprollup
//   rollup(config, _options) {
//     return {
//       ...config,
//       // TODO: Replace with banner option when terser supports "use client" directive https://github.com/terser/terser/issues/1320
//       plugins: [...config.plugins, banner(() => "'use client';")],
//     };
//   },
// };
