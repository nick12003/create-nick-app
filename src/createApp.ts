import path from "path";
import { isWriteable } from "./utils/isWriteable";
import { installTemplate } from "./templates";
import fs from "fs";
import { green } from "picocolors";
import { cwd } from "process";

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
      "The application path is not writable, please check folder permissions and try again."
    );
    console.error(
      "It is likely you do not have write permissions for this folder."
    );
    process.exit(1);
  }

  fs.mkdirSync(appPath, { recursive: true });

  console.log(`Creating a new app in ${green(appPath)}.`);
  console.log();

  process.chdir(appPath);

  installTemplate({
    appPath,
    appName,
    isMonorepo,
  });
};
