#!/usr/bin/env node
import prompts, { type InitialReturnValue } from "prompts";
import path from "path";
import { program } from "commander";
import fs from "fs";
import packageJson from "../package.json";

import { validateNpmName } from "./utils/validatePkg";
import { isFolderEmpty } from "./utils/isFolderEmpty";
import { createApp } from "./createApp";

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version);

program.parse();

(async () => {
  const res = await prompts([
    {
      type: "text",
      name: "path",
      message: "What is your project named?",
      initial: "my-app",
      validate: (name) => {
        const validation = validateNpmName(path.basename(path.resolve(name)));
        if (validation.valid) {
          return true;
        }
        return "Invalid project name: " + validation.problems[0];
      },
    },
    {
      type: "toggle",
      name: "isMonorepo",
      message: "Would you like to use Monorepo?",
      initial: "No",
      inactive: "No",
      active: "Yes",
    },
  ]);

  const resolvedProjectPath = path.resolve(res.path);

  const root = path.resolve(resolvedProjectPath);
  const appName = path.basename(root);
  const folderExists = fs.existsSync(root);

  if (folderExists && !isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  await createApp({
    appPath: resolvedProjectPath,
    appName: appName,
    isMonorepo: res.isMonorepo,
  });
})();
