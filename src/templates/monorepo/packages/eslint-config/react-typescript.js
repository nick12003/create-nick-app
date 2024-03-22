/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@nick12003/eslint-config-nick/react-typescript'],
  rules: {
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'import/prefer-default-export': 0,
  },
};
