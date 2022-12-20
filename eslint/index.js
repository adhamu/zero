module.exports = {
  env: {
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:no-unsanitized/DOM',
    'plugin:prettier/recommended',
    'plugin:regexp/recommended',
    'plugin:security/recommended',
  ],
  plugins: [
    'no-unsanitized',
    'no-wildcard-postmessage',
    'node',
    'regexp',
    'woke',
  ],

  /* ----------- BASE ----------- */
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'class-methods-use-this': 'off',
    curly: ['error', 'all'],
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
    'import/no-relative-packages': 'off',
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
        pathGroups: [
          { group: 'external', pattern: 'react', position: 'before' },
          {
            group: 'external',
            pattern: '@*/**',
            position: 'after',
          },
          {
            group: 'index',
            pattern: './*',
            position: 'after',
          },
          {
            group: 'index',
            pattern: '*.json',
            patternOptions: { matchBase: true },
            position: 'after',
          },
          {
            group: 'index',
            pattern: '*.?(s)css',
            patternOptions: { matchBase: true },
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    'no-alert': 'warn',
    'no-control-regex': 'off',
    'no-debugger': 'warn',
    'no-underscore-dangle': 'off',
    'no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'no-warning-comments': 'warn',
    'no-wildcard-postmessage/no-wildcard-postmessage': 'error',
    'node/no-deprecated-api': 'error',
    'node/no-extraneous-import': 'error',
    'node/no-extraneous-require': 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
    'require-await': 'error',
    strict: 'warn',
    'woke/profanity': 2,
    yoda: ['error', 'never'],
  },

  overrides: [
    /* ----------- TYPESCRIPT ----------- */
    {
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
      ],
      files: ['**/*.ts?(x)'],
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/no-extra-semi': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { ignoreRestSiblings: true },
        ],
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/semi': ['error', 'never'],
        'import/default': 'off',
        'import/named': 'off',
        'import/namespace': 'off',
        'import/no-default-export': 'error',
        'import/no-named-as-default-member': 'off',
        'import/prefer-default-export': 'off',
        indent: 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'operator-linebreak': 'off',
        semi: 'off',
      },
    },

    /* ----------- REACT ----------- */
    {
      extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime'],
      files: ['**/*.[jt]sx'],
      plugins: ['react-hooks', 'react', '@emotion', 'jsx-a11y'],
      rules: {
        '@typescript-eslint/no-use-before-define': 'error',
        'import/no-default-export': 'off',
        'import/prefer-default-export': 'error',
        'react/jsx-boolean-value': ['error', 'never'],
        'react/jsx-curly-brace-presence': [
          'error',
          { children: 'never', props: 'never' },
        ],
        'react/jsx-filename-extension': [
          'error',
          { extensions: ['.jsx', '.tsx'] },
        ],
        'react/jsx-fragments': ['error', 'syntax'],
        'react/jsx-no-useless-fragment': 'error',
        'react/jsx-props-no-spreading': 'off',
        'react/no-array-index-key': 'warn',
        'react/no-find-dom-node': 'warn',
        'react/no-multi-comp': 'error',
        'react/prop-types': 'off',
      },
    },

    /* ----------- TESTING ----------- */
    {
      extends: [
        'plugin:jest-dom/recommended',
        'plugin:jest-formatting/recommended',
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:testing-library/react',
      ],
      files: ['**/*.{test,spec}.[jt]s?(x)'],
      plugins: [
        'jest',
        'jest-dom',
        'jest-formatting',
        'no-only-tests',
        'testing-library',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'ban-ts-comment': 'off',
        'ban-ts-ignore': 'off',
        camelcase: 'off',
        'jest/expect-expect': 'error',
        'jest/no-alias-methods': 'error',
        'jest/no-conditional-expect': 'off',
        'jest/no-focused-tests': 'warn',
        'jest/no-try-expect': 'off',
        'jest/require-top-level-describe': 'error',
        'no-console': 'off',
        'no-empty-function': 'off',
        'no-only-tests/no-only-tests': 'error',
        'react/display-name': 'off',
        'react/no-multi-comp': 'off',
        'react/prop-types': 'off',
        'security/detect-non-literal-fs-filename': 'off',
        'testing-library/no-await-sync-events': [
          'error',
          { eventModules: ['fire-event'] },
        ],
        'testing-library/no-manual-cleanup': 'error',
        'testing-library/no-render-in-setup': [
          'error',
          { allowTestingFrameworkSetupHook: 'beforeEach' },
        ],
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

    /* ----------- CONFIG ----------- */
    {
      files: [
        '**/*.{config,preset}.[jt]s',
        '**/{test-setup,setupTests,environment}.[jt]s',
        '**/*.{spec,test}.[jt]s?(x)',
      ],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'global-require': 'off',
        'import/no-default-export': 'off',
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: [
              '**/*.{config,preset}.[jt]s',
              '**/{test-setup,setupTests,environment}.[jt]s',
              '**/*.{spec,test}.[jt]s?(x)',
            ],
          },
        ],
        'no-var-requires': 'off',
        'node/no-extraneous-import': 'off',
      },
    },
  ],
  settings: {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: [
          '**/tsconfig.json',
          './tsconfig.json',
          './tsconfig.base.json',
        ],
      },
    },
    jest: {
      version: 'detect',
    },
    react: {
      version: 'detect',
    },
  },
}
