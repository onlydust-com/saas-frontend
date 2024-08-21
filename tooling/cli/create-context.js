/* eslint-disable @typescript-eslint/no-var-requires */

const i = require("@inquirer/prompts");
const fs = require("fs/promises");
const prettier = require("prettier");
const { COLORS, kebabToPascal, kebabToCamel, defaultPromptName, exists } = require("./global");
const { exec } = require("node:child_process");

async function createContextFile({ files, names }) {
  await fs.appendFile(
    files.context,
    await prettier.format(
      `
      "use client";
      
      import { PropsWithChildren, createContext, useContext } from "react";
      
      interface ${names.context.PascalName}ContextInterface {
        sample: string;
      }
      
      export const ${names.context.PascalName}Context = createContext<${names.context.PascalName}ContextInterface>({
        sample: "",
      });
      
      export function ${names.context.PascalName}Provider({ children }: PropsWithChildren) {
        return <${names.context.PascalName}Context.Provider value={{ sample: "" }}>{children}</${names.context.PascalName}Context.Provider>;
      }
      
      export function use${names.context.PascalName}() {
        return useContext(${names.context.PascalName}Context);
      }

  `,
      { parser: "typescript" }
    )
  );
}

async function createFiles(informations) {
  await createContextFile(informations);

  await exec(`eslint '${informations.paths.root}/**/*.{js,jsx,json,ts,tsx}' --max-warnings=0 --fix`);
}

async function promptName() {
  const path = await i.input({ message: "Folder path:" });

  const isPathExist = await exists(path);

  if (!isPathExist) {
    console.log(`${COLORS.RED}❌ Folder not exist${COLORS.NC}`);

    return defaultPromptName();
  }

  const componentName = path.split("/").pop();

  const root = {
    folder: path,
    path: path,
  };
  const paths = {
    root: `${path}`,
  };

  const files = {
    context: `${paths.root}/${componentName}.context.tsx`,
  };

  const names = {
    componentName: {
      name: componentName,
      PascalName: kebabToPascal(componentName),
      camelName: kebabToCamel(componentName),
    },
    context: {
      name: `${componentName}.context`,
      PascalName: `${kebabToPascal(componentName)}`,
      camelName: `${kebabToCamel(componentName)}`,
    },
  };

  return { root, names, files, paths };
}

async function createContext() {
  const { root, names, files, paths } = await promptName();

  await createFiles({
    root,
    names,
    files,
    paths,
  });

  console.log(`\n${COLORS.GREEN}✅ Context created${COLORS.NC}`);
  console.log(`Context path: ${COLORS.BLUE}${paths.context}${COLORS.NC}\n`);
}

module.exports = { createContext };
