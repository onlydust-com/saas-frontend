export interface ContributorPanelFooterProps {
  githubUserId: number;
  login: string;
  onAssign: (githubUserId: number) => void;
}

export interface ApplicantsTableProps {
  projectId?: string;
  issueId?: number;
  onAssign: (githubUserId: number) => void;
}
