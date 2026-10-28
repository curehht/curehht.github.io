import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'

const config = [
  { ignores: ['.next/**', 'out/**', 'drizzle/**', 'node_modules/**'] },
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
  {
    // Existing violations; fix when the UI layer is rebuilt on the design system.
    rules: {
      'react-hooks/purity': 'warn',
      'react-hooks/refs': 'warn',
    },
  },
  {
    files: ['**/*.js'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
]

export default config
