module.exports = {
  extends: [
    'stylelint-config-idiomatic-order',
    'stylelint-prettier/recommended',
  ],
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
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
