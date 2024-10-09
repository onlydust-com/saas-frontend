export interface ContributorPanelFooterProps {
  githubUserId: number;
  login: string;
  onAssign: (githubUserId: number) => void;
}

export interface ApplicantsTableProps {
  projectId?: string;
  contributionId: string;
  onAssign: (githubUserId: number) => void;
}
