const { includeIgnoreFile } = require('@eslint/compat')

const { gitIgnoredFiles } = require('../gitIgnoredFiles')

jest.mock('@eslint/compat')

describe('gitIgnoredFiles', () => {
  const mockIncludeIgnoreFile = includeIgnoreFile

  beforeEach(jest.clearAllMocks)

  it('returns a list of ignored files', () => {
    mockIncludeIgnoreFile.mockReturnValue({
      ignores: ['.DS_Store', 'build', 'coverage'],
    })

    expect(gitIgnoredFiles()).toEqual(['.DS_Store', 'build', 'coverage'])
  })

  it('returns an empty array if there are no ignores', () => {
    mockIncludeIgnoreFile.mockReturnValue({})

    expect(gitIgnoredFiles()).toEqual([])
  })

  it('returns an empty array if includeIgnoreFile throws an error', () => {
    mockIncludeIgnoreFile.mockImplementation(() => {
      throw new Error('BAD')
    })

    expect(gitIgnoredFiles()).toEqual([])
  })
})
