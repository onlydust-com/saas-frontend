export interface ProjectSidepanelProps {
  projectId: string | null;
}

export interface ProjectSidePanelData {
  onGrantClick?: (projectId: string) => void;
  projectId: string;
  canGoBack?: boolean;
}
