#!/usr/bin/env node

/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */

const { spawn } = require('child_process')
const fs = require('fs')
const { basename } = require('path')

const { select, multiselect, text } = require('@clack/prompts')
const colors = require('colors')
const prettier = require('prettier')

const { name, dependencies } = require('../package.json')

const projectPackageJsonFile = `${process.cwd()}/package.json`
const projectPackageJson = require(projectPackageJsonFile)

const sourceDeps = [
  ...Object.keys(dependencies),
  'prettier-eslint',
  'prettier-eslint-cli',
]
const targetDeps = [
  ...Object.keys(projectPackageJson.dependencies || []),
  ...Object.keys(projectPackageJson.devDependencies || []),
]
const toRemove = targetDeps.filter(dep => sourceDeps.includes(dep))

const deleteFiles = files => {
  files.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file, err => {
        if (err) {
          console.log(err)
        }
      })
      console.log(colors.gray(`Deleted ${basename(file)}`))
    }
  })
}

const writeFile = async (file, content) => {
  fs.writeFileSync(
    file,
    await prettier.format(content, { filepath: file }),
    err => {
      if (err) {
        throw err
      }
    }
  )
  console.log(colors.blue(`Saved ${basename(file)}`))
}

const toJson = content => JSON.stringify(content, null, 2)

async function main() {
  let removeExtraDeps = false
  let runYarn = false
  let prettierConfirm = false
  let requireTsconfig = false
  let outDir = false

  if (toRemove.length) {
    removeExtraDeps = await select({
      message: `We have found the following extra dependencies that are not required when using ${name}\n\n${toRemove.join(
        '\n'
      )}\n\nWould you like to remove them now?`,
      options: [
        {
          value: true,
          label: 'Yes please',
        },
        {
          value: false,
          label: "No, I'll do it myself later",
        },
      ],
    })
  }

  if (removeExtraDeps) {
    runYarn = await select({
      message:
        'package.json will be modified. Shall we run yarn after setup is complete?',
      options: [
        {
          value: true,
          label: 'Yes',
        },
        {
          value: false,
          label: 'No',
        },
      ],
    })
  }

  const configs = await multiselect({
    message: 'What would you like to setup?',
    options: [
      { value: 'ESLint' },
      { value: 'Prettier' },
      { value: 'Stylelint' },
    ],
  })

  if (!configs.includes('Prettier')) {
    prettierConfirm = await select({
      message:
        "Prettier is recommended. Are you sure you don't want to configure it?",
      options: [
        {
          value: true,
          label: 'Configure Prettier',
        },
        {
          value: false,
          label: "No, I'm sure, I don't want it",
        },
      ],
    })
  }

  const type = await select({
    message: 'Which type of project is it?',
    options: [{ value: 'JavaScript' }, { value: 'TypeScript' }],
  })

  const isReact = await select({
    message: 'Are you using React?',
    options: [
      {
        value: 'withReact',
        label: 'Yes',
      },
      {
        value: 'withoutReact',
        label: 'No',
      },
    ],
  })

  const lintHelperScripts = await select({
    message:
      'Would you like to add helper scripts to your package.json for running ESLint?',
    options: [
      {
        value: true,
        label: 'Yes',
      },
      {
        value: false,
        label: 'No',
      },
    ],
  })

  if (type === 'TypeScript') {
    requireTsconfig = await select({
      message: 'Would you like to setup a TSConfig?',
      options: [
        {
          value: true,
          label: 'Yes',
        },
        {
          value: false,
          label: 'No',
        },
      ],
    })
  }

  if (requireTsconfig) {
    outDir = await text({
      message: 'Please enter the TypeScript build directory (outDir)',
    })
  }

  if (!configs.includes('Prettier') && !!prettierConfirm) {
    configs.push('Prettier')
  }

  if (removeExtraDeps) {
    console.log(colors.gray('Removing extra dependencies from package.json'))

    targetDeps.forEach(dep => {
      if (sourceDeps.includes(dep)) {
        if (projectPackageJson.dependencies) {
          delete projectPackageJson.dependencies[`${dep}`]
        }
        if (projectPackageJson.devDependencies) {
          delete projectPackageJson.devDependencies[`${dep}`]
        }
      }
    })

    if (Object.keys(projectPackageJson.dependencies || []).length === 0) {
      delete projectPackageJson.dependencies
    }

    if (Object.keys(projectPackageJson.devDependencies || []).length === 0) {
      delete projectPackageJson.devDependencies
    }

    await writeFile(projectPackageJsonFile, toJson(projectPackageJson))

    if (runYarn) {
      spawn('yarn', null, { stdio: 'inherit' })
    } else {
      console.log(
        colors.red(
          'package.json has been modified. Ensure you run `yarn` after setup!'
        )
      )
    }
  }

  if (lintHelperScripts) {
    console.log(colors.gray('Adding helper scripts to package.json'))

    let helperScripts = {}

    if (configs.includes('ESLint')) {
      helperScripts = {
        ...helperScripts,
        lint: 'eslint .',
        'lint:fix': 'yarn lint --fix',
      }
    }

    if (configs.includes('Stylelint')) {
      helperScripts = {
        ...helperScripts,
        'lint:styles': "stylelint '**/*.{css,scss}'",
        'lint:styles:fix': 'yarn lint:styles --fix',
      }
    }

    projectPackageJson.scripts = {
      ...projectPackageJson.scripts,
      ...helperScripts,
    }

    await writeFile(projectPackageJsonFile, toJson(projectPackageJson))
  }

  if (configs.includes('ESLint')) {
    deleteFiles([
      '.eslintrc',
      '.eslintrc.json',
      '.eslintrc.js',
      '.eslintrc.cjs',
      '.eslintrc.mjs',
      'eslint.config.js',
      '.eslintignore',
    ])

    await writeFile(
      'eslint.config.js',
      `const eslintConfig = require('@adhamu/zero/eslint')

module.exports = eslintConfig
      `
    )
  }

  if (configs.includes('Prettier')) {
    deleteFiles([
      '.prettierrc',
      '.prettierrc.yml',
      '.prettierrc.yaml',
      '.prettierrc.js',
    ])

    if (configs.includes('Stylelint')) {
      deleteFiles([
        '.stylelintrc',
        '.stylelintrc.json',
        '.stylelintrc.js',
        '.stylelintrc.cjs',
        '.stylelintrc.mjs',
        'stylelint.config.js',
        '.stylelintignore',
      ])

      await writeFile(
        'stylelint.config.js',
        `const stylelintConfig = require('@adhamu/zero/stylelint')

module.exports = stylelintConfig
        `
      )
    }

    await writeFile('.prettierrc.yaml', '"@adhamu/zero/prettier"')
  }

  if (requireTsconfig) {
    deleteFiles(['tsconfig.json'])

    await writeFile(
      'tsconfig.json',
      toJson({
        extends: `@adhamu/zero/tsconfig/${isReact ? 'react' : 'base'}.json`,
        include: ['**/*.ts*'],
        compilerOptions: {
          outDir,
        },
      })
    )
  }

  if (configs.length > 0) {
    console.log(
      colors.green(
        '✅ Setup complete! Please review all configurations before committing'
      )
    )
  } else {
    console.log(colors.yellow('⚠️  No configurations selected or configured'))
  }
}

main()
