import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if we're building for static deployment
const isStaticBuild = process.env.BUILD_MODE === 'static';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Only include dts plugin for library builds
    ...(!isStaticBuild ? [dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    })] : []),
  ],
  // For static builds, use standard app build config
  ...(isStaticBuild ? {
    build: {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            charts: ['recharts'],
            ui: ['@mui/material', '@emotion/react', '@emotion/styled'],
          },
        },
      },
    },
  } : {
    // Library build config
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.tsx'),
        name: 'RAIDashboard',
        fileName: 'rai-dashboard',
        formats: ['es', 'umd'],
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime',
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') return 'style.css';
            return assetInfo.name || 'asset';
          },
        },
      },
      cssCodeSplit: false,
      sourcemap: true,
    },
  }),
  server: {
    host: '0.0.0.0',
    port: 3001,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
});
