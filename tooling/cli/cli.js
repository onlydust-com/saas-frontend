/* eslint-disable @typescript-eslint/no-var-requires */
const i = require("@inquirer/prompts");
const createComponent = require("./create-component").createMainComponent;
const createDS = require("./create-ds").createDS;
const createDomain = require("./create-domain").createDomain;
const createTranslation = require("./create-translation").createTranslation;
const createContext = require("./create-context").createContext;

async function runCli() {
  const action = await i.select({
    message: "Select an action",
    choices: [
      {
        name: "local component",
        value: "local-component",
        description: "Create a local component",
      },
      {
        name: "design system component",
        value: "ds-component",
        description: "Create a design system component",
      },
      {
        name: "domain",
        value: "domain",
        description: "Create a new domain",
      },
      {
        name: "translation",
        value: "translation",
        description: "Add a translation to a page or features",
      },
      {
        name: "Component context",
        value: "component-context",
        description: "Add a minimal component context",
      },
    ],
  });

  if (action === "local-component") {
    await createComponent();
  } else if (action === "ds-component") {
    await createDS();
  } else if (action === "domain") {
    await createDomain();
  } else if (action === "translation") {
    await createTranslation();
  } else if (action === "component-context") {
    await createContext();
  }
}

runCli();
