const { includeIgnoreFile } = require('@eslint/compat')

const gitIgnoredFiles = () => {
  const gitignorePath = `${process.cwd()}/.gitignore`

  try {
    return includeIgnoreFile(gitignorePath)?.ignores ?? []
  } catch {
    return []
  }
}

module.exports = { gitIgnoredFiles }
