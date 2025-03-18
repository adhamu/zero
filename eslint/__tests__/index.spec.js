const eslintConfig = require('..')

describe('ESLint config', () => {
  it('returns the correct config', () => {
    expect(eslintConfig).toMatchSnapshot()
  })
})
