module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-idiomatic-order',
    'stylelint-prettier/recommended',
  ],
  plugins: ['stylelint-prettier'],
  rules: {
    'declaration-property-unit-disallowed-list': {
      'font-size': ['px'],
      'line-height': ['px'],
    },
    'function-parentheses-space-inside': null,
    indentation: null,
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
    'prettier/prettier': true,
    'selector-no-qualifying-type': [
      true,
      { ignore: ['attribute', 'class', 'id'] },
    ],
  },

  overrides: [
    {
      extends: [
        'stylelint-config-idiomatic-order',
        'stylelint-prettier/recommended',
        'stylelint-config-sass-guidelines',
      ],
      files: ['**/*.scss'],
      plugins: ['stylelint-prettier', 'stylelint-scss'],
      rules: {
        'max-nesting-depth': [
          2,
          {
            ignoreAtRules: ['each', 'media', 'supports', 'include'],
          },
        ],
        'order/properties-alphabetical-order': null,
        'selector-no-qualifying-type': [
          true,
          { ignore: ['attribute', 'class', 'id'] },
        ],
      },
    },
  ],
}
