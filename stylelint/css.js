module.exports = {
  extends: [
    'stylelint-config-idiomatic-order',
    'stylelint-prettier/recommended',
  ],
  overrides: [
    {
      files: ['**/*.{js,ts,jsx,tsx}'],
      customSyntax: '@stylelint/postcss-css-in-js',
    },
  ],
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'declaration-property-unit-disallowed-list': {
      'font-size': ['px'],
      'line-height': ['px'],
    },
    'selector-no-qualifying-type': [
      true,
      { ignore: ['attribute', 'class', 'id'] },
    ],
    'length-zero-no-unit': true,
    'order/order': [
      [
        'custom-properties',
        'dollar-variables',
        {
          type: 'at-rule',
          name: 'extend',
        },
        'declarations',
        {
          type: 'at-rule',
          name: 'include',
          hasBlock: false,
        },
        'rules',
      ],
    ],
  },
}
