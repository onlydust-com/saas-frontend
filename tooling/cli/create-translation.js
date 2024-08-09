/* eslint-disable @typescript-eslint/no-var-requires */

const i = require("@inquirer/prompts");
const fs = require("fs/promises");
const prettier = require("prettier");
const { COLORS, kebabToPascal, kebabToCamel, defaultPromptName, exists } = require("./global");
const { exec } = require("node:child_process");

async function createJsonFile({ files }) {
  await fs.appendFile(
    files.json,
    await prettier.format(
      `
        {
          
        }
  `,
      { parser: "typescript" }
    )
  );
}

async function createIndexFile({ files, name, camelName }) {
  await fs.appendFile(
    files.index,
    await prettier.format(
      `
      import ${camelName} from "./${name}.en.json";
      
      export const ${camelName}Translation = {
        ${kebabToCamel(name)}: ${camelName},
      };

  `,
      { parser: "typescript" }
    )
  );
}

async function createFiles(informations) {
  await createJsonFile(informations);
  await createIndexFile(informations);

  await exec(`eslint '${informations.path}/**/*.{js,jsx,json,ts,tsx}' --max-warnings=0 --fix`);
}

async function promptName() {
  const path = await i.input({ message: "Folder path::" });

  const isPathExist = await exists(path);

  if (!isPathExist) {
    console.log(`${COLORS.RED}❌ Folder not exist${COLORS.NC}`);

    return defaultPromptName();
  }

  const fileName = path.split("/").pop();

  const paths = {
    root: `${path}`,
    translation: `${path}/_translations`,
  };

  const files = {
    json: `${paths.translation}/${fileName}.en.json`,
    index: `${paths.translation}/${fileName}.translate.ts`,
  };

  return { folder: path, name: fileName, path, files, paths };
}

async function createTranslation() {
  const { folder, name, path, paths, files } = await promptName();

  await fs.mkdir(paths.translation);
  const PascalName = `En${kebabToPascal(name)}`;
  const camelName = `en${kebabToPascal(name)}`;

  await createFiles({
    folder,
    name,
    path,
    PascalName,
    camelName,
    paths,
    files,
  });

  console.log(`\n${COLORS.GREEN}✅ Translation created${COLORS.NC}`);
  console.log(`Translation path: ${COLORS.BLUE}${path}${COLORS.NC}\n`);
}

module.exports = { createTranslation };
