module.exports = {
  tabWidth: 2,
  semi: false,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'avoid',
  singleQuote: true,
  singleAttributePerLine: false,
  overrides: [
    {
      files: ['*.yaml', '*.yml'],
      options: {
        singleQuote: false,
      },
    },
  ],
}
