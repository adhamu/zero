# Zero

<div align="center">
  <img src="https://raw.githubusercontent.com/adhamu/zero/main/logo.png" alt="drawing" width="350"/>

Shared linting and formatting configurations.

[![Build](https://github.com/adhamu/zero/workflows/CI/badge.svg)](https://github.com/adhamu/zero/actions)

</div>

## Includes

- [Installation](#installation)
- [Requirements](#requirements)
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
yarn add @adhamu/zero -D
```

## Usage

### Setup Wizard

```sh
npx zero
```

### Manual

Alternatively, you can selectively install the configurations you need.

#### ESLint

```sh
cat > .eslintrc.json << EOF
{
  "extends": ["./node_modules/@adhamu/zero/eslint"]
}
EOF
```

- [See configurations](./eslint)

#### Prettier

```sh
cat > .prettierrc.yaml << EOF
"@adhamu/zero/prettier"
EOF
```

If you would like to override any Prettier settings, you can instead use a Javascript file:

```shell
cat > .prettierrc.js << EOF
module.exports = {
  ...require('@adhamu/zero/prettier'),
  semi: true,
}
EOF
```

- [See configurations](./prettier)

#### Stylelint

```sh
cat > .stylelintrc.json << EOF
{
  "extends": ["./node_modules/@adhamu/zero/stylelint"]
}
EOF
```

- [See configurations](./stylelint)

#### TSConfig

```sh
cat > tsconfig.json << EOF
{
  "extends": "@adhamu/zero/tsconfig/base.json",
  "include": ["src/**/*.ts"],
  "compilerOptions": {
    "outDir": "./dist"
  }
}
EOF
```

- [See configurations](./tsconfig)

#### Jest

```sh
cat > jest.config.js << EOF
module.exports = {
  ...require('@adhamu/zero/jest'),
  transform: { '^.+\\.ts(x)?$': 'ts-jest' },
}
EOF
```

Note: You will need to install your own transformer. Eg. `ts-jest`, `@swc/jest` etc.

- [See configuration](./jest)
