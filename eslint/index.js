const { FlatCompat } = require('@eslint/eslintrc')
const js = require('@eslint/js')
const parserTypescript = require('@typescript-eslint/parser')
const pluginImport = require('eslint-plugin-import')
const pluginJest = require('eslint-plugin-jest')
const pluginJestDom = require('eslint-plugin-jest-dom')
const pluginJsxA11y = require('eslint-plugin-jsx-a11y')
const pluginN = require('eslint-plugin-n')
const pluginNoOnlyTests = require('eslint-plugin-no-only-tests')
const pluginNoUnsanitized = require('eslint-plugin-no-unsanitized')
const pluginNoWildcardPostmessage = require('eslint-plugin-no-wildcard-postmessage')
const pluginPrettier = require('eslint-plugin-prettier')
const pluginReact = require('eslint-plugin-react')
const pluginRegexp = require('eslint-plugin-regexp')
const pluginSecurity = require('eslint-plugin-security')
const pluginTestingLibrary = require('eslint-plugin-testing-library')
const pluginWoke = require('eslint-plugin-woke')
const globals = require('globals')
const pluginTypescriptEslint = require('typescript-eslint')

const { gitIgnoredFiles } = require('../utils')

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

module.exports = [
  { ignores: gitIgnoredFiles() },
  ...compat.extends('airbnb-base'),
  {
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
        ...globals.browser,
      },
      parser: parserTypescript,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      '@typescript-eslint': pluginTypescriptEslint.plugin,
      import: pluginImport,
      jest: pluginJest,
      'jest-dom': pluginJestDom,
      'jsx-a11y': pluginJsxA11y,
      n: pluginN,
      'no-only-tests': pluginNoOnlyTests,
      'no-unsanitized': pluginNoUnsanitized,
      'no-wildcard-postmessage': pluginNoWildcardPostmessage,
      prettier: pluginPrettier,
      react: pluginReact,
      regexp: pluginRegexp,
      security: pluginSecurity,
      'testing-library': pluginTestingLibrary,
      woke: pluginWoke,
    },

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

    /* ----------- BASE ----------- */
    rules: {
      ...js.configs.recommended.rules,
      ...pluginNoUnsanitized.configs.recommended.rules,
      ...pluginPrettier.configs.recommended.rules,
      ...pluginRegexp.configs.recommended.rules,
      ...pluginN.configs.recommended.rules,
      'arrow-body-style': ['error', 'as-needed'],
      'arrow-parens': ['error', 'as-needed'],
      'brace-style': 'off',
      'class-methods-use-this': 'off',
      'comma-dangle': 'off',
      'comma-spacing': 'off',
      'consistent-return': 'error',
      curly: ['error', 'all'],
      'func-call-spacing': 'off',
      'function-paren-newline': 'off',
      'implicit-arrow-linebreak': 'off',
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
      'import/no-useless-path-segments': [
        'error',
        {
          noUselessIndex: true,
        },
      ],
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
            ['parent', 'sibling', 'index'],
            'type',
          ],
          'newlines-between': 'always',
          pathGroups: [
            {
              group: 'external',
              pattern: 'react',
              position: 'before',
            },
            {
              group: 'index',
              pattern: '*.?(gif|png|jpg|jpeg|svg|tiff)',
              patternOptions: {
                matchBase: true,
              },
              position: 'after',
            },
            {
              group: 'index',
              pattern: '*.json',
              patternOptions: {
                matchBase: true,
              },
              position: 'after',
            },
            {
              group: 'index',
              pattern: '*.?(s)css',
              patternOptions: {
                matchBase: true,
              },
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react', 'type'],
        },
      ],
      'import/prefer-default-export': 'off',
      indent: 'off',
      'max-len': 'off',
      'n/hashbang': 'off',
      'n/no-deprecated-api': 'error',
      'n/no-extraneous-import': 'error',
      'n/no-extraneous-require': 'error',
      'n/no-missing-import': 'off',
      'n/no-missing-require': 'off',
      'n/no-process-exit': 'off',
      'n/no-unpublished-import': 'off',
      'n/no-unpublished-require': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
      'n/no-unsupported-features/node-builtins': 'off',
      'no-alert': 'warn',
      'no-await-in-loop': 'error',
      'no-confusing-arrow': 'off',
      'no-console': 'error',
      'no-continue': 'error',
      'no-control-regex': 'off',
      'no-debugger': 'warn',
      'no-extra-semi': 'off',
      'no-param-reassign': 'error',
      'no-spaced-func': 'off',
      'no-underscore-dangle': 'off',
      'no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true,
        },
      ],
      'no-useless-constructor': 'error',
      'no-warning-comments': 'warn',
      'no-wildcard-postmessage/no-wildcard-postmessage': 'error',
      'object-curly-newline': 'off',
      'operator-linebreak': 'off',
      'require-await': 'error',
      'security/detect-child-process': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-non-literal-fs-filename': 'error',
      'security/detect-object-injection': 'off',
      'security/detect-pseudoRandomBytes': 'error',
      'security/detect-unsafe-regex': 'error',
      semi: 'off',
      'semi-style': 'off',
      'space-before-function-paren': 'off',
      strict: 'warn',
      'woke/profanity': 'error',
      yoda: ['error', 'never'],
    },
  },

  /* ----------- TYPESCRIPT ----------- */
  {
    files: ['**/*.ts?(x)'],
    rules: {
      ...pluginTypescriptEslint.configs.recommended[2].rules,
      ...pluginTypescriptEslint.configs.stylistic[2].rules,
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          custom: {
            match: false,
            regex: '^I[A-Z]',
          },
          format: ['PascalCase'],
          selector: 'typeLike',
        },
      ],
      '@typescript-eslint/no-extra-semi': 'off',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-use-before-define': 'error',
      'import/default': 'off',
      'import/named': 'off',
      'import/namespace': 'off',
      'import/no-default-export': 'error',
      'import/no-named-as-default-member': 'off',
      'import/prefer-default-export': 'off',
      'no-shadow': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
    },
  },

  /* ----------- REACT ----------- */
  {
    files: ['**/*.[jt]sx'],
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs['jsx-runtime'].rules,
      '@typescript-eslint/no-use-before-define': 'error',
      'import/no-default-export': 'off',
      'import/prefer-default-export': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': [
        'error',
        {
          children: 'never',
          props: 'never',
        },
      ],
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.jsx', '.tsx'],
        },
      ],
      'react/jsx-fragments': ['error', 'syntax'],
      'react/jsx-no-leaked-render': [
        'error',
        {
          validStrategies: ['coerce', 'ternary'],
        },
      ],
      'react/jsx-no-useless-fragment': [
        'error',
        {
          allowExpressions: true,
        },
      ],
      'react/jsx-props-no-spreading': 'off',
      'react/no-array-index-key': 'warn',
      'react/no-find-dom-node': 'warn',
      'react/no-multi-comp': 'error',
      'react/prop-types': 'off',
    },
  },

  /* ----------- TESTING ----------- */
  {
    files: ['**/*.{test,spec}.[jt]s?(x)'],
    rules: {
      ...pluginJestDom.configs.recommended.rules,
      ...pluginJest.configs.recommended.rules,
      ...pluginJest.configs.style.rules,
      ...pluginTestingLibrary.configs.react.rules,
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
      'jest/valid-title': [
        'error',
        { disallowedWords: ['should', "shouldn't"] },
      ],
      'no-console': 'off',
      'no-empty-function': 'off',
      'no-only-tests/no-only-tests': 'error',
      'react/display-name': 'off',
      'react/no-multi-comp': 'off',
      'react/prop-types': 'off',
      'security/detect-non-literal-fs-filename': 'off',
      'testing-library/no-await-sync-events': [
        'error',
        {
          eventModules: ['fire-event'],
        },
      ],
      'testing-library/no-manual-cleanup': 'error',
      'testing-library/no-render-in-lifecycle': [
        'error',
        {
          allowTestingFrameworkSetupHook: 'beforeEach',
        },
      ],
      'testing-library/no-unnecessary-act': 'error',
      'testing-library/no-wait-for-multiple-assertions': 'error',
      'testing-library/no-wait-for-side-effects': 'error',
      'testing-library/no-wait-for-snapshot': 'error',
      'testing-library/prefer-explicit-assert': 'error',
      'testing-library/prefer-presence-queries': 'error',
      'testing-library/prefer-user-event': 'error',
    },
  },

  /* ----------- CONFIG ----------- */
  {
    files: [
      '**/*.{config,preset}.[jt]s',
      '**/{test-setup,setupTests,environment}.[jt]s?(x)',
      '**/*.{spec,test}.[jt]s?(x)',
    ],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      'import/no-default-export': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.{config,preset}.[jt]s',
            '**/{test-setup,setupTests,environment}.[jt]s?(x)',
            '**/*.{spec,test}.[jt]s?(x)',
          ],
        },
      ],
      'n/no-extraneous-import': 'off',
      'n/no-extraneous-require': 'off',
    },
  },
  {
    files: ['**/eslint.config.js'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          message:
            "Do not use 'no-restricted-syntax' in eslint.config.js. Instead use the 'mergeRule' function from '@adhamu/zero/utils'",
          selector:
            "Property[key.value='no-restricted-syntax'][value.type='ArrayExpression']",
        },
        {
          message:
            "Do not use 'no-restricted-imports' in eslint.config.js. Instead use the 'mergeRule' function from '@adhamu/zero/utils'",
          selector:
            "Property[key.value='no-restricted-imports'][value.type='ArrayExpression']",
        },
      ],
    },
  },
]
