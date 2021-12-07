module.exports = {
  extends: [
    './css',
    'stylelint-config-sass-guidelines',
    'stylelint-prettier/recommended',
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'order/properties-alphabetical-order': null,
    // add deeper nesting to align with Airbnb css/scss style guide
    'max-nesting-depth': [
      2,
      {
        ignoreAtRules: ['each', 'media', 'supports', 'include'],
      },
    ],
  },
}
