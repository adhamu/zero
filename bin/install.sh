#!/usr/bin/env bash

echo "Installing configurations..."

printf ".npmrc...\r"
cat > ~/Desktop/test/.npmrc << EOF
always-auth=true
@adhamu:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_REGISTRY_TOKEN}
EOF
echo -e "✅ .npmrc"

printf "ESLint...\r"
cat > ~/Desktop/test/.eslintrc.json << EOF
{
  "extends": ["./node_modules/@adhamu/zero/eslint/typescript"]
}
EOF
echo -e "✅ ESLint"

printf "Stylelint...\r"
cat > ~/Desktop/test/.stylelintrc.json << EOF
{
  "extends": ["./node_modules/@adhamu/zero/stylelint/css"]
}
EOF
echo -e "✅ Stylelint"

printf "TSConfig...\r"
cat > ~/Desktop/test/tsconfig.json << EOF
{
  "extends": "./node_modules/@adhamu/zero/tsconfig/base.json",
  "include": ["src/**/*.ts"]
}
EOF
echo -e "✅ TSConfig"

printf "Prettier...\r"
cat > ~/Desktop/test/.prettierrc.yml << EOF
'@adhamu/zero/prettier'
EOF
echo -e "✅ Prettier"

printf "Jest...\r"
cat > ~/Desktop/test/jest.config.js << EOF
module.exports = require('@adhamu/zero/jest')
EOF
echo -e "✅ Jest"
