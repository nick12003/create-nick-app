/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';
import { cyan, green } from 'picocolors';

import { installTemplate } from './templates';
import { tryGitCommit, tryGitInit } from './utils/git';
import { isWriteable } from './utils/isWriteable';

export const createApp = async ({
  appPath,
  appName,
  isMonorepo,
}: {
  appPath: string;
  appName: string;
  isMonorepo: boolean;
}) => {
  if (!(await isWriteable(path.dirname(appPath)))) {
    console.error(
      'The application path is not writable, please check folder permissions and try again.',
    );
    console.error('It is likely you do not have write permissions for this folder.');
    process.exit(1);
  }

  fs.mkdirSync(appPath, { recursive: true });

  const originalDirectory = process.cwd();

  console.log(`Creating a new app in ${green(appPath)}.`);
  console.log();

  process.chdir(appPath);

  if (tryGitInit(appPath)) {
    console.log('Initialized a git repository.');
    console.log();
  }

  await installTemplate({
    appPath,
    isMonorepo,
  });

  if (tryGitCommit()) {
    console.log('Created a git commit.');
    console.log();
  }

  let cdpath: string;
  if (path.join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }

  console.log(`${green('Success!')} Created ${appName} at ${appPath}`);
  console.log();

  console.log('Inside that directory, you can run several commands:');
  console.log();
  console.log('We suggest that you begin by typing:');
  console.log();
  console.log(cyan('  cd'), cdpath);
  console.log(`  ${cyan(`pnpm dev`)}`);
  console.log();
};
