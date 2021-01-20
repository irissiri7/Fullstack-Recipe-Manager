/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    // 'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
  }
}
