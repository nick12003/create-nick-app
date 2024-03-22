#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { program } from 'commander';
import fs from 'fs';
import path from 'path';
import { green } from 'picocolors';
import prompts from 'prompts';

import packageJson from '../package.json';
import { createApp } from './createApp';
import { isFolderEmpty } from './utils/isFolderEmpty';
import { validateNpmName } from './utils/validatePkg';

let projectPath: string = '';

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version)
  .usage(`${green('<project-directory>')}`)
  .arguments('[project-directory]')
  .action((name) => {
    projectPath = name;
  })
  .allowExcessArguments()
  .parse();

(async () => {
  if (!projectPath) {
    const res = await prompts({
      type: 'text',
      name: 'path',
      message: 'What is your project named?',
      initial: 'my-app',
      validate: (name) => {
        const validation = validateNpmName(path.basename(path.resolve(name)));
        if (validation.valid) {
          return true;
        }
        return `Invalid project name: ${validation.problems[0]}`;
      },
    });
    if (typeof res.path === 'string') {
      projectPath = res.path.trim();
    }
  }

  const res = await prompts({
    type: 'toggle',
    name: 'isMonorepo',
    message: 'Would you like to use Monorepo?',
    initial: 'No',
    inactive: 'No',
    active: 'Yes',
  });

  const resolvedProjectPath = path.resolve(projectPath);

  const root = path.resolve(resolvedProjectPath);
  const appName = path.basename(root);
  const folderExists = fs.existsSync(root);

  if (folderExists && !isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  await createApp({
    appPath: resolvedProjectPath,
    appName,
    isMonorepo: res.isMonorepo,
  });
})();
