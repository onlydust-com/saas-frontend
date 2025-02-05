import { useLocalStorage } from "react-use";

import { ProjectCreationSteps } from "../types/ProjectCreationSteps";
import { CreateFormData } from "../types/ProjectCreationType";

const STORAGE_KEY = "create-project-";
export const STORAGE_KEY_CREATE_PROJECT_FORM = `${STORAGE_KEY}form`;
export const STORAGE_KEY_CREATE_PROJECT_STEP = `${STORAGE_KEY}step`;
export const STORAGE_KEY_CREATE_PROJECT_INSTALLATED_REPOS = `${STORAGE_KEY}installed-repos`;

export const useProjectCreationFormStorage = () => {
  const [value, setValue, removeValue] = useLocalStorage<CreateFormData | undefined>(STORAGE_KEY_CREATE_PROJECT_FORM, undefined);

  return { value, getValue: () => value, setValue, removeValue };
};

export const useProjectCreationStepStorage = () => {
  const [value, setValue, removeValue] = useLocalStorage<ProjectCreationSteps>(STORAGE_KEY_CREATE_PROJECT_STEP, ProjectCreationSteps.ORGANIZATIONS);

  return { value, getValue: () => value, setValue, removeValue };
};

export const useProjectCreationInstalledReposStorage = () => {
  const [value, setValue, removeValue] = useLocalStorage<number[]>(STORAGE_KEY_CREATE_PROJECT_INSTALLATED_REPOS, []);

  return { value, getValue: () => value, setValue, removeValue };
};

export const useResetStorage = () => {
  const formStorage = useProjectCreationFormStorage();
  const stepStorage = useProjectCreationStepStorage();
  const installedRepoStorage = useProjectCreationInstalledReposStorage();

  const reset = () => {
    formStorage.removeValue();
    installedRepoStorage.removeValue();
    stepStorage.removeValue();
  };

  return { reset };
};
