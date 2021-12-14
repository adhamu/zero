# Zero

<div align="center">
  <img src="logo.png" alt="drawing" width="350"/>

Shared linting and formatting configurations.

[![Build](https://github.com/adhamu/zero/workflows/CI/badge.svg)](https://github.com/adhamu/zero/actions)

</div>

## Includes

- [Installation](#installation)
- [Usage](#usage)
  - [Quickstart](#quickstart)
  - [Manual](#manual)
    - [ESLint](#eslint)
    - [Prettier](#prettier)
    - [Stylelint](#stylelint)
    - [TSConfig](#tsconfig)
    - [Jest](#jest)

## Installation

```sh
nvm use
yarn add @adhamu/zero -D
```

## Usage

### Quickstart

You can install all configuration at once by using the quickstart script below. This will create all the necessary files with the appropriate configuration.

```sh
npx zero
```

### Manual

Alternatively, you can selectively install the configurations you need.

#### ESLint

```sh
cat > .eslintrc.json << EOF
{
  "extends": ["./node_modules/@adhamu/zero/eslint/typescript"]
  // More options can go here...
}
EOF
```

- [See configurations](./eslint)

#### Prettier

```sh
cat > .prettierrc.yaml << EOF
'@adhamu/zero/prettier'
EOF
```

- [See configurations](./prettier)

#### Stylelint

```sh
cat > .stylelintrc.json << EOF
{
  "extends": ["./node_modules/@adhamu/zero/stylelint/css"]
  // More options can go here...
}
EOF
```

- [See configurations](./stylelint)

#### TSConfig

```sh
cat > tsconfig.json << EOF
{
  "extends": "./node_modules/@adhamu/zero/tsconfig/base.json",
  "include": ["src/**/*.ts"]
  // Any other TSConfig options
}
EOF
```

- [See configurations](./tsconfig)

#### Jest

```sh
cat > jest.config.js << EOF
module.exports = require('@adhamu/zero/jest')
EOF
```

- [See configuration](./jest)
