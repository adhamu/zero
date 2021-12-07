# Zero

Shared linting and formatting configurations.

## Includes

- [ESLint](#eslint)
- [Prettier](#prettier)
- [Stylelint](#stylelint)
- [TSConfig](#tsconfig)

## Installation

```sh
yarn add @devmatic/zero -D
```

## Usage

### ESLint

```sh
cat > .eslintrc.json << EOF
{
  "extends": ["./node_modules/@devmatic/zero/eslint/base"]
  // More options can go here...
}
EOF
```

- [See configuration](./eslint)

### Prettier

```sh
cat > .prettierrc.yaml << EOF
'@devmatic/zero/prettier'
EOF
```

- [See configuration](./prettier)

### Stylelint

```sh
cat > .stylelintrc.json << EOF
{
  "extends": ["./node_modules/@devmatic/zero/stylelint/css"]
  // More options can go here...
}
EOF
```

- [See configuration](./stylelint)

### TSConfig

```sh
cat > tsconfig.json << EOF
{
  "extends": "./node_modules/@devmatic/zero/tsconfig/base.json"
  // Any other TSConfig options
}
EOF
```

- [See configuration](./tsconfig)
