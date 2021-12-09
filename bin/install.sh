#!/usr/bin/env bash

echo "Installing configurations..."

printf "ESLint...\r"
cat > .eslintrc.json << EOF
{
  "extends": ["./node_modules/@adhamu/zero/eslint/typescript"]
}
EOF
echo -e "✅ ESLint"

printf "Stylelint...\r"
cat > .stylelintrc.json << EOF
{
  "extends": ["./node_modules/@adhamu/zero/stylelint/css"]
}
EOF
echo -e "✅ Stylelint"

printf "TSConfig...\r"
cat > tsconfig.json << EOF
{
  "extends": "./node_modules/@adhamu/zero/tsconfig/base.json",
  "include": ["src/**/*.ts"]
}
EOF
echo -e "✅ TSConfig"

printf "Prettier...\r"
cat > .prettierrc.yml << EOF
'@adhamu/zero/prettier'
EOF
echo -e "✅ Prettier"

printf "Jest...\r"
cat > jest.config.js << EOF
module.exports = require('@adhamu/zero/jest')
EOF
echo -e "✅ Jest"
