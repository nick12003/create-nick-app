import path from "path";
import { copy } from "../utils/copy";
import { yellow } from "picocolors";
import spawn from "cross-spawn";

export const installTemplate = async ({
  appPath,
  appName,
  isMonorepo,
}: {
  appPath: string;
  appName: string;
  isMonorepo: boolean;
}) => {
  console.log(
    "\nInitializing project with template:",
    isMonorepo ? "monorepo" : "default",
    "\n"
  );

  const templatePath = path.join(
    __dirname,
    isMonorepo ? "monorepo" : "default"
  );

  await copy(["**"], appPath, {
    parents: true,
    cwd: templatePath,
    rename(name) {
      switch (name) {
        case "gitignore":
        case "eslintrc.json": {
          return `.${name}`;
        }
        // README.md is ignored by webpack-asset-relocator-loader used by ncc:
        // https://github.com/vercel/webpack-asset-relocator-loader/blob/e9308683d47ff507253e37c9bcbb99474603192b/src/asset-relocator.js#L227
        case "README-template.md": {
          return "README.md";
        }
        default: {
          return name;
        }
      }
    },
  });

  await new Promise((resolve, reject) => {
    /**
     * Spawn the installation process.
     */
    const child = spawn("pnpm", ["install"], {
      stdio: "inherit",
      env: {
        ...process.env,
        ADBLOCK: "1",
        // we set NODE_ENV to development as pnpm skips dev
        // dependencies when production
        NODE_ENV: "development",
        DISABLE_OPENCOLLECTIVE: "1",
      },
    });
    child.on("close", (code) => {
      if (code !== 0) {
        reject({ command: `pnpm install` });
        return;
      }
      resolve(undefined);
    });
  });
};
