import antfu from '@antfu/eslint-config'

const OFF = 0
const WARN = 1
const ERROR = 2

export default antfu({
  ignores: ['public', 'build', 'dist', 'node_modules', 'coverage', 'src/assets/**'],
  stylistic: false,
  jsonc: true,
  formatters: false,
  typescript: true,
  react: true,
  markdown: true,
  extends: ['next/core-web-vitals'],
  rules: {
    'antfu/top-level-function': OFF,
    'react-dom/no-unsafe-target-blank': OFF,
    'react-dom/no-missing-button-type': OFF,
    'react-hooks/exhaustive-deps': WARN,
    'react/no-useless-fragment': OFF,
    'react/no-array-index-key': OFF,
    'react-hooks/rules-of-hooks': OFF,
    'react/no-comment-textnodes': OFF,
    'react-refresh/only-export-components': OFF,
    'react-hooks-extra/no-unnecessary-use-prefix': OFF,
    'react-hooks-extra/prefer-use-state-lazy-initialization': OFF,
    'react-dom/no-dangerously-set-innerhtml': OFF,

    'unused-imports/no-unused-vars': WARN,
    curly: [ERROR, 'multi-line', 'consistent'],

    'no-multiple-empty-lines': [
      ERROR,
      {
        max: 3,
      },
    ],
    'no-console': WARN,

    'ts/no-use-before-define': OFF,
    'ts/ban-ts-comment': OFF,
  },
})
