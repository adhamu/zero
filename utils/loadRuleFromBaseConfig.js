const loadRuleFromBaseConfig = ruleName => {
  // eslint-disable-next-line global-require
  const eslintConfig = require('../eslint')

  return (
    eslintConfig.find(config => config.rules?.[ruleName]).rules?.[ruleName] ??
    []
  )
}

module.exports = { loadRuleFromBaseConfig }
