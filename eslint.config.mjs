import tsParser from '@typescript-eslint/parser';

const eslintConfig = [
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'dist/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      complexity: ['warn', 12],
      'max-lines': ['warn', { max: 250, skipBlankLines: true, skipComments: true }],
    },
  },
  {
    files: ['src/app/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@/features/*/internal/*'],
        },
      ],
    },
  },
  {
    files: ['src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@/app/*', '@/features/*'],
        },
      ],
    },
  },
];

export default eslintConfig;
