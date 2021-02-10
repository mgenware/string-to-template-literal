module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-typescript-lite', 'plugin:@typescript-eslint/recommended', 'mgenware'],
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'import/extensions': 'off',
  },
};
