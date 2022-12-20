#!/usr/bin/env node

/* eslint-disable security/detect-child-process */
/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable security/detect-non-literal-require */
/* eslint-disable no-console */

const { spawn } = require('child_process')
const fs = require('fs')
const { basename } = require('path')

const colors = require('colors')
const inquirer = require('inquirer')
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

const writeFile = (file, content) => {
  fs.writeFileSync(file, prettier.format(content, { filepath: file }), err => {
    if (err) {
      throw err
    }
  })
  console.log(colors.blue(`Saved ${basename(file)}`))
}

const toJson = content => JSON.stringify(content, null, 2)

inquirer
  .prompt([
    {
      type: 'list',
      name: 'removeExtraDeps',
      message: `We have found the following extra dependencies that are not required when using ${name}\n\n${toRemove.join(
        '\n'
      )}\n\nWould you like to remove them now?`,
      choices: [
        { name: 'Yes please', value: true },
        { name: "No, I'll do it myself later", value: false },
      ],
      when: () => toRemove.length > 0,
    },
    {
      type: 'list',
      name: 'runYarn',
      message:
        'package.json will be modified. Shall we run yarn after setup is complete?',
      choices: [
        { name: 'Yes', value: true },
        { name: 'No', value: false },
      ],
      when: ({ removeExtraDeps }) => !!removeExtraDeps,
    },
    {
      type: 'checkbox',
      name: 'configs',
      message: 'What would you like to setup?',
      choices: ['ESLint', 'Prettier'],
    },
    {
      type: 'list',
      name: 'prettierConfirm',
      message:
        "Prettier is recommended alongside ESLint. Are you sure you don't want to configure it?",
      choices: [
        { name: 'Configure Prettier', value: true },
        { name: "No, I'm sure, I don't want it", value: false },
      ],
      when: ({ configs }) =>
        configs.includes('ESLint') && !configs.includes('Prettier'),
    },
    {
      type: 'list',
      name: 'type',
      message: 'Which type of project is it?',
      choices: ['JavaScript', 'TypeScript'],
    },
    {
      type: 'list',
      name: 'isReact',
      message: 'Are you using React?',
      choices: [
        { name: 'Yes', value: 'withReact' },
        { name: 'No', value: 'withoutReact' },
      ],
    },
    {
      type: 'list',
      name: 'lintHelperScripts',
      message:
        'Would you like to add helper scripts to your package.json for running ESLint?',
      choices: [
        { name: 'Yes', value: true },
        { name: 'No', value: false },
      ],
    },
    {
      type: 'list',
      name: 'requireTsconfig',
      message: 'Would you like to setup a TSConfig?',
      choices: [
        { name: 'Yes', value: true },
        { name: 'No', value: false },
      ],
      when: ({ type }) => type === 'TypeScript',
    },
    {
      type: 'input',
      name: 'outDir',
      message: 'Please enter the TypeScript build directory (outDir)',
      when: ({ requireTsconfig }) => !!requireTsconfig,
    },
  ])
  .then(answers => {
    const {
      configs,
      isReact,
      outDir,
      prettierConfirm,
      removeExtraDeps,
      requireTsconfig,
      runYarn,
      lintHelperScripts,
    } = answers

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

      writeFile(projectPackageJsonFile, toJson(projectPackageJson))

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
      console.log(colors.gray('Adding ESLint helper scripts to package.json'))

      projectPackageJson.scripts = {
        ...projectPackageJson.scripts,
        lint: 'eslint .',
        'lint:fix': 'yarn lint --fix',
      }

      writeFile(projectPackageJsonFile, toJson(projectPackageJson))
    }

    if (configs.includes('ESLint')) {
      deleteFiles(['.eslintrc', '.eslintrc.json', '.eslintrc.js'])

      writeFile(
        '.eslintrc.json',
        toJson({
          extends: ['./node_modules/@adhamu/zero/eslint'],
        })
      )
    }

    if (configs.includes('Prettier')) {
      deleteFiles([
        '.prettierrc',
        '.prettierrc.yml',
        '.prettierrc.yaml',
        '.prettierrc.js',
      ])

      writeFile('.prettierrc.yaml', '"@adhamu/zero/prettier"')
    }

    if (requireTsconfig) {
      deleteFiles(['tsconfig.json'])

      writeFile(
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
  })
