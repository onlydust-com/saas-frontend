export interface ContributorPanelFooterProps {
  login: string;
  applicationId?: string;
  contributionId?: string;
  repoId: number;
  onAssign: () => void;
}

export interface ApplicantsTableProps {
  projectId?: string;
  contributionId?: string;
  repoId: number;
  onAssign: () => void;
}
