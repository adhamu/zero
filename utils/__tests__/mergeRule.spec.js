const { loadRuleFromBaseConfig } = require('../loadRuleFromBaseConfig')
const { mergeRule } = require('../mergeRule')

jest.mock('../loadRuleFromBaseConfig')

describe('mergeRule', () => {
  const mockLoadRuleFromBaseConfig = loadRuleFromBaseConfig

  beforeEach(jest.clearAllMocks)

  it('merges rules when config is an array', () => {
    mockLoadRuleFromBaseConfig.mockReturnValue([
      'error',
      [{ name: 'foo' }, { name: 'bar' }],
    ])

    expect(mergeRule('test', [{ name: 'baz' }])).toEqual({
      test: ['error', [{ name: 'foo' }, { name: 'bar' }], { name: 'baz' }],
    })
  })

  it('merges rules when config is an object', () => {
    mockLoadRuleFromBaseConfig.mockReturnValue([
      'error',
      {
        name: 'foo',
      },
      {
        name: 'bar',
      },
    ])

    expect(mergeRule('test', [{ name: 'baz' }])).toEqual({
      test: ['error', { name: 'foo' }, { name: 'bar' }, { name: 'baz' }],
    })
  })

  it('returns just the overrides if base rule not found', () => {
    mockLoadRuleFromBaseConfig.mockReturnValue([])

    expect(mergeRule('test', [{ name: 'baz' }])).toEqual({
      test: ['error', { name: 'baz' }],
    })
  })
})
