/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/next.js'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['apps/web/tsconfig.json'],
      },
    },
  },
};
