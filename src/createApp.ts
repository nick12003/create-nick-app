/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';
import { green } from 'picocolors';

import { installTemplate } from './templates';
import { isWriteable } from './utils/isWriteable';

export const createApp = async ({
  appPath,
  isMonorepo,
}: {
  appPath: string;
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

  console.log(`Creating a new app in ${green(appPath)}.`);
  console.log();

  process.chdir(appPath);

  await installTemplate({
    appPath,
    isMonorepo,
  });
};
