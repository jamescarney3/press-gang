import * as path from 'path';

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
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
      importPlugin.flatConfigs.recommended,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.app.json',
        },
      },
    },
    rules: {
      'max-len': ['warn', 120],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      semi: ['warn'],
      quotes: ['warn', 'single', { avoidEscape: true }],
      // hopefully someday the import/order rule will work with eslint v10+...
      // 'import/order': [
      //   'error',
      //   {
      //     groups: ['builtin', 'external', 'internal', 'sibling', 'parent', 'index'],
      //   },
      // ],
      'import/newline-after-import': ['error', { count: 1, exactCount: true, considerComments: true }],
    },
  },
]);
