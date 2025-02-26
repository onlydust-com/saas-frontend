import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export interface ActionableTipsProps {
  projectId: string;
}

export type AcquisitionTipIdentifier = components["schemas"]["ProjectAcquisitionTipResponse"]["identifier"];

export type ActionHandler = (projectId: string) => void;

export interface TipAction {
  label: string;
  action: ActionHandler;
}

export const createTipToActionMap = (
  navigate: (path: string) => void,
  openProject: (projectId: string) => void
): Record<AcquisitionTipIdentifier, TipAction> => ({
  MISSING_LOGO: {
    label: "Add project logo",
    action: projectId => openProject(projectId),
  },
  MISSING_CATEGORY: {
    label: "Set project category",
    action: projectId => navigate(`/manage-projects/${projectId}/settings/general`),
  },
  MISSING_ECOSYSTEM: {
    label: "Set project ecosystem",
    action: projectId => navigate(`/manage-projects/${projectId}/settings/general`),
  },
  MISSING_README: {
    label: "Add README file",
    action: projectId => openProject(projectId),
  },
  DESCRIPTION_TOO_SHORT: {
    label: "Improve project description",
    action: projectId => openProject(projectId),
  },
  README_TOO_SHORT: {
    label: "Expand README content",
    action: projectId => openProject(projectId),
  },
  OUTDATED_DESCRIPTION: {
    label: "Update project description",
    action: projectId => openProject(projectId),
  },
  MISSING_AVAILABLE_ISSUES: {
    label: "Add available issues",
    action: projectId => navigate(`/manage-projects/${projectId}/issues`),
  },
});

// identifier: "MISSING_LOGO" | "MISSING_CATEGORY" | "MISSING_ECOSYSTEM" | "MISSING_README" | "DESCRIPTION_TOO_SHORT" | "README_TOO_SHORT" | "OUTDATED_DESCRIPTION" | "MISSING_AVAILABLE_ISSUES"
