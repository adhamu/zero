module.exports = {
  extends: [
    '@stylistic/stylelint-config',
    'stylelint-config-standard-scss',
    'stylelint-config-idiomatic-order',
  ],
  plugins: ['stylelint-scss'],
  rules: {
    '@stylistic/function-parentheses-space-inside': null,
    '@stylistic/string-quotes': [
      'single',
      {
        avoidEscape: true,
      },
    ],
    'declaration-property-unit-disallowed-list': {
      'font-size': ['px'],
      'line-height': ['px'],
    },
    'length-zero-no-unit': true,
    'order/order': [
      [
        'custom-properties',
        'dollar-variables',
        {
          name: 'extend',
          type: 'at-rule',
        },
        'declarations',
        {
          hasBlock: false,
          name: 'include',
          type: 'at-rule',
        },
        'rules',
      ],
    ],
    'selector-no-qualifying-type': [
      true,
      { ignore: ['attribute', 'class', 'id'] },
    ],
  },

  overrides: [
    {
      files: ['**/*.css'],
      rules: {
        'at-rule-no-unknown': true,
      },
    },
    {
      files: ['**/*.scss'],
      rules: {
        'at-rule-no-unknown': [
          true,
          {
            ignoreAtRules: ['use', 'forward', 'include', 'mixin'],
          },
        ],
        'max-nesting-depth': [
          2,
          {
            ignoreAtRules: ['each', 'media', 'supports', 'include'],
          },
        ],
      },
    },
  ],
}
