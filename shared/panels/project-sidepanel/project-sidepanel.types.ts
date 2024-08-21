export interface ProjectSidepanelProps {
  projectId: string | null;
  onGrantClick?: (projectId: string) => void;
}
