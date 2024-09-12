"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";

import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { UseSidePanel } from "@/shared/features/side-panels/side-panel/side-panel.types";

import { ProjectSidepanel } from "./project-sidepanel";

interface ProjectSidePanelContextInterface extends Omit<UseSidePanel<object>, "Panel" | "open"> {
  open: (projectId: string) => void;
}

export const ProjectSidePanelContext = createContext<ProjectSidePanelContextInterface>({
  open: () => {},
  close: () => {},
  back: () => {},
  isOpen: false,
  name: "",
});

interface ProjectSidePanelProviderProps extends PropsWithChildren {
  onGrantClick?: (projectId: string) => void;
}

export function ProjectSidePanelProvider({ children, onGrantClick }: ProjectSidePanelProviderProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const { Panel, open, ...rest } = useSidePanel({ name: "project-detail" });

  function handleOpenProjectDetail(projectId: string) {
    setSelectedProjectId(projectId);
    open();
  }

  return (
    <ProjectSidePanelContext.Provider value={{ ...rest, open: handleOpenProjectDetail }}>
      {children}
      <Panel>
        <ProjectSidepanel projectId={selectedProjectId} onGrantClick={onGrantClick} />
      </Panel>
    </ProjectSidePanelContext.Provider>
  );
}

export function useProjectSidePanel() {
  return useContext(ProjectSidePanelContext);
}
