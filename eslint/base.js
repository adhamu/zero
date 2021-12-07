module.exports = {
  env: {
    node: true,
    es6: true,
    browser: false,
    jest: true,
  },
  plugins: [
    'regexp',
    'woke',
    'no-unsanitized',
    'no-wildcard-postmessage',
    'node',
  ],
  extends: [
    'airbnb-base',
    'plugin:regexp/recommended',
    'plugin:no-unsanitized/DOM',
    'plugin:prettier/recommended',
  ],
  rules: {
    /**
     * FORMATTING
     */
    'no-alert': 'warn',
    'no-control-regex': 'off',
    'no-debugger': 'warn',
    'no-warning-comments': 'warn',
    strict: 'warn',
    'arrow-body-style': ['error', 'as-needed'],
    'no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        groups: [
          'builtin',
          'external',
          'internal',
          'type',
          ['parent', 'sibling', 'index'],
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@dunelm/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
      },
    ],
    'woke/profanity': 2,
    'class-methods-use-this': 'off',
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    curly: ['error', 'all'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
      },
    ],
    'require-await': 'error',
    yoda: ['error', 'never'],
    /**
     * SECURITY
     */
    'no-wildcard-postmessage/no-wildcard-postmessage': 1,
    'node/no-deprecated-api': 1,
    'node/no-extraneous-import': 1,
    'node/no-extraneous-require': 1,
  },
  overrides: [
    {
      files: ['**/*.config.js'],
      rules: {
        'no-var-requires': 'off',
        'global-require': 'off',
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: ['**/*.config.js'] },
        ],
      },
    },
    /**
     * TESTING
     */
    {
      files: [
        '**/__tests__/*.{test,spec}.[jt]s?(x)',
        '**/*.{pact,verifier}.[jt]s?(x)',
      ],
      plugins: ['jest', 'jest-dom', 'jest-formatting', 'testing-library'],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:jest-formatting/recommended',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react',
      ],
      rules: {
        'jest/require-top-level-describe': 'error',
        'jest/expect-expect': 'error',
        'jest/no-alias-methods': 'error',
        'jest/no-focused-tests': 'warn',
        camelcase: 'off',
        'no-empty-function': 'off',
        'ban-ts-comment': 'off',
        'ban-ts-ignore': 'off',
        'no-only-tests/no-only-tests': 'error',
        'security/detect-non-literal-fs-filename': 'off',
        'react/display-name': 'off',
        'jest/no-conditional-expect': 'off',
        'jest/no-try-expect': 'off',
        'no-console': 'off',
        'react/prop-types': 'off',
        'testing-library/no-await-sync-events': 'error',
        'testing-library/no-manual-cleanup': 'error',
        'testing-library/no-unnecessary-act': 'error',
        'testing-library/no-wait-for-multiple-assertions': 'error',
        'testing-library/no-wait-for-side-effects': 'error',
        'testing-library/no-wait-for-snapshot': 'error',
        'testing-library/prefer-explicit-assert': 'error',
        'testing-library/prefer-presence-queries': 'error',
        'testing-library/prefer-user-event': 'error',
        'testing-library/prefer-wait-for': 'error',
      },
    },
    {
      files: ['**/tests/**/*.[jt]s'],
      plugins: ['testcafe', 'no-only-tests'],
      extends: ['plugin:testcafe/recommended'],
      rules: {
        camelcase: 'off',
        'no-empty-function': 'off',
        'ban-ts-comment': 'off',
        'ban-ts-ignore': 'off',
        'no-only-tests/no-only-tests': 'error',
        'security/detect-non-literal-fs-filename': 'off',
      },
    },
  ],
  settings: {
    jest: {
      version: 'detect',
    },
  },
}
