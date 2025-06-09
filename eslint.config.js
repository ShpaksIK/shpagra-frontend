import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig({
  overrides: [
    {
      files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      plugins: {
        js,
        react: pluginReact,
      },
      extends: [
        'js/recommended',
        'prettier/recommended',
        tseslint.configs.recommended,
        pluginReact.configs.flat.recommended,
      ],
      languageOptions: {
        globals: {
          ...globals.browser,
        },
      },
      rules: {
        'prettier/prettier': [
          'warn',
          {
            endOfLine: 'auto',
          },
        ],
      },
    },
  ],
});
