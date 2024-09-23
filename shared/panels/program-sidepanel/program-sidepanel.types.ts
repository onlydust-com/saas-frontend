export interface ProgramSidePanelData {
  programId: string;
  canGoBack?: boolean;
  onEditClick?: (programId: string) => void;
}
