/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@nick12003/eslint-config-nick/react-typescript', 'next/core-web-vitals'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['./tsconfig.json'],
      },
    },
  },
};
