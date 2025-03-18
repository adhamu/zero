const stylelintConfig = require('..')

describe('Stylelint config', () => {
  it('returns the correct config', () => {
    expect(stylelintConfig).toMatchSnapshot()
  })
})
