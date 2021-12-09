module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
    jest: true,
  },
  extends: ['./react', './typescript'],
  rules: {
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/static-property-placement': ['error', 'static public field'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        mjs: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
  },
  overrides: [
    {
      files: ['**/*.[jt]sx'],
      rules: {
        'import/prefer-default-export': 'error',
        'import/no-default-export': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
}
