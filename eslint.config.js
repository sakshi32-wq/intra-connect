//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    rules: {
      'import/no-cycle': 'off',
      'import/order': 'off',
      'sort-imports': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'off',
      'pnpm/json-enforce-catalog': 'off',
    },
  },
  {
    // Only feature api.ts files talk to the mock backend, so it can be
    // replaced by a real API without touching anything else.
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/features/*/api.ts', 'src/mocks/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['#/mocks/*', '**/mocks/*'],
              message: 'Import data through src/features/<feature>/api.ts.',
            },
          ],
        },
      ],
    },
  },
  {
    // shadcn-generated components stay as upstream ships them
    ignores: [
      'eslint.config.js',
      'prettier.config.js',
      'src/components/ui/**',
      'src/routeTree.gen.ts',
      '.claude/**',
    ],
  },
]
