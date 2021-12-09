# Zero

Shared linting and formatting configurations.

## Includes

- [Installation](#installation)
  - [Create a Token](#create-a-token)
  - [Install the package](#install-the-package)
- [Usage](#usage)
  - [Quickstart](#quickstart)
  - [Manual](#manual)
    - [ESLint](#eslint)
    - [Prettier](#prettier)
    - [Stylelint](#stylelint)
    - [TSConfig](#tsconfig)
    - [Jest](#jest)

## Installation

### Create a Token

You'll need a GitHub Personal Access Token with `read:packages` permission. You can create one at [https://github.com/settings/tokens](https://github.com/settings/tokens).

Once you have it, copy it to your clipboard as you'll never see it again and add it to your `.zshrc` or `.bash_profile`

```sh
export GITHUB_REGISTRY_TOKEN=YOUR_TOKEN_HERE
```

Then `source ~/.zshrc` or `source ~/.bash_profile`.

### Install the package

Create an `.npmrc` in your project to install from the GitHub Package Registry

```sh
cat > .npmrc << EOF
always-auth=true
@adhamu:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_REGISTRY_TOKEN}
EOF
```

```sh
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
