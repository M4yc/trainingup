import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginImportHelpers from 'eslint-plugin-import-helpers';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        },
        project: './tsconfig.json'
      }
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'import-helpers': pluginImportHelpers,
      prettier: pluginPrettier
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json'
        }
      }
    },
    rules: {
      'no-unused-vars': ['warn', { args: 'none' }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'no-use-before-define': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'prettier/prettier': ['warn'],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-use-before-define': 'off',
      'react/jsx-filename-extension': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            '/^react/',
            '/^next/',
            'module',
            '/^@shared/',
            ['parent', 'sibling', 'index']
          ],
          alphabetize: { order: 'asc', ignoreCase: true }
        }
      ]
    }
  },
  configPrettier
];
