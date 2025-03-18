const eslintConfig = require('./eslint')

module.exports = [
  ...eslintConfig,
  {
    files: ['**/prettier/*', '**/eslint/*', '**/stylelint/*'],
    rules: {
      'sort-keys': [
        'error',
        'asc',
        {
          caseSensitive: true,
          natural: false,
          minKeys: 2,
          allowLineSeparatedGroups: true,
        },
      ],
    },
  },
]
