const { resolve } = require('path')

module.exports = {
  roots: ['./src'],
  testRegex: '(/__tests__/.*.(test|spec))\\.(ts|tsx|js)?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageDirectory: resolve(process.cwd(), '.coverage'),
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  rootDir: process.cwd(),
  testEnvironment: 'node',
}
