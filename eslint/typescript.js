module.exports = {
  extends: ['./base'],
  overrides: [
    {
      files: ['*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        './base',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
      ],
      settings: {
        'import/extensions': ['.js', '.mjs', '.ts'],
        'import/resolver': {
          node: {
            extensions: ['.js', '.json', '.ts'],
          },
          webpack: {
            extensions: ['.js', '.json', '.ts'],
          },
        },
      },
      rules: {
        /**
         * Avoid export default.
         * @see https://basarat.gitbook.io/typescript/main-1/defaultisbad
         */
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',

        indent: 'off',
        '@typescript-eslint/indent': 'off',

        semi: 'off',
        '@typescript-eslint/semi': ['error', 'never'],
        '@typescript-eslint/no-extra-semi': 'off',

        /** Add ts to airbnb's list. */
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            mjs: 'never',
            jsx: 'never',
            ts: 'never',
          },
        ],
        'import/named': 'off',
        'import/namespace': 'off',
        'import/default': 'off',
        'import/no-named-as-default-member': 'off',
        'operator-linebreak': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { ignoreRestSiblings: true },
        ],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/consistent-type-imports': ['error'],
      },
    },
    {
      files: ['**/*.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'global-require': 'off',
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: ['**/*.config.js'] },
        ],
      },
    },
  ],
}
