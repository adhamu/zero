module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
    jest: true,
  },
  extends: ['./react', './typescript'],
  rules: {
    /** Add .tsx to react/jsx-filename-extension. */
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    /**
     * TypeScript supports public class fields so prefer public fields for static properties.
     * https://github.com/airbnb/javascript/blob/a24dc34a4a2748c99006a48e997aa0a06b1d4d94/packages/eslint-config-airbnb/rules/react.js#L487-L490
     *
     */
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
