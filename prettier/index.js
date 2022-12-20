module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  jsxSingleQuote: false,
  overrides: [
    {
      files: ['*.yaml', '*.yml'],
      options: {
        singleQuote: false,
      },
    },
  ],
  quoteProps: 'as-needed',
  semi: false,
  singleAttributePerLine: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
}
