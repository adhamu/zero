const { loadRuleFromBaseConfig } = require('../loadRuleFromBaseConfig')

jest.mock('../../eslint', () => [
  {
    rules: {
      'no-console': 'off',
      'no-alert': ['error', { option: 'sometimes' }],
    },
  },
  {
    files: ['**/*.jsx'],
    rules: {
      'no-array-key-index': 'off',
    },
  },
])

describe('loadRuleFromBaseConfig', () => {
  beforeEach(jest.clearAllMocks)

  it.each([
    ['off', 'no-array-key-index'],
    [['error', { option: 'sometimes' }], 'no-alert'],
  ])('returns %o when rule is %p', (result, rule) => {
    expect(loadRuleFromBaseConfig(rule)).toEqual(result)
  })
})
