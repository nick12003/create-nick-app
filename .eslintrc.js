/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@nick12003/eslint-config-nick/typescript'],
  ignorePatterns: ['dist/', 'templates/default', 'templates/monorepo'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['./tsconfig.json'],
      },
    },
  },
};
