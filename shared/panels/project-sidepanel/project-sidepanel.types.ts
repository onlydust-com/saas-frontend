export interface ProjectSidePanelData {
  onGrantClick?: (projectId: string) => void;
  projectId: string;
  canGoBack?: boolean;
}
