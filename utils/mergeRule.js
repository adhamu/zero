const { loadRuleFromBaseConfig } = require('./loadRuleFromBaseConfig')

/**
 * Merges a given rule with the base ESLint configuration.
 *
 * @param {string} ruleName - The ESLint rule name.
 * @param {Array|Object} overrides - The user-defined rule configuration.
 * @param {string} [severity='error'] - The severity level of the rule.
 * @example
 * {
 *   'rules': {
 *     ...mergeRule('no-restricted-imports', [
 *       {
 *         name: 'lodash',
 *         importNames: ['map'],
 *         message: 'Please use the Javascript builtin .map function instead',
 *       }
 *     ]),
 *   }
 * }
 */
const mergeRule = (ruleName, overrides, severity = 'error') => {
  const [, ...baseRules] = loadRuleFromBaseConfig(ruleName)

  if (Array.isArray(overrides)) {
    return {
      [ruleName]: [severity, ...baseRules, ...overrides],
    }
  }

  return {
    [ruleName]: [
      severity,
      Object.keys(...baseRules).reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: [...(baseRules?.[curr] ?? []), ...(overrides?.[curr] ?? [])],
        }),
        {}
      ),
    ],
  }
}

module.exports = { mergeRule }
