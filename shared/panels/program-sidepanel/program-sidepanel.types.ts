export interface ProgramSidePanelData {
  programId: string;
  canGoBack?: boolean;
  onEditClick?: (programId: string) => void;
  onAllocateClick?: (programId: string) => void;
}
