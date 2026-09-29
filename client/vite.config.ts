/// <reference types="vitest/config" />

import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(import.meta.dirname, './src'),
      test: path.resolve(import.meta.dirname, './test'),
    },
  },
  test: {
    environment: 'jsdom',
  },
});
