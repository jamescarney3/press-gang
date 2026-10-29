import * as path from 'path';

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importX from 'eslint-plugin-import-x';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      importX.flatConfigs.recommended,
      importX.flatConfigs.typescript,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      'import-x/resolver': {
        alias: {
          map: [
            ['~', path.resolve(import.meta.dirname, './src')],
            ['test', path.resolve(import.meta.dirname, './test')],
          ],
          extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
        },
      },
    },
    rules: {
      'max-len': ['warn', 120],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      semi: ['warn'],
      quotes: ['warn', 'single', { avoidEscape: true }],
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'sibling', 'parent', 'index'],
        },
      ],
      'import-x/newline-after-import': ['error', { count: 1, exactCount: true, considerComments: true }],
    },
  },
]);
