export interface ContributorPanelFooterProps {
  login: string;
  applicationId?: string;
  contributionGithubId?: number;
  repoId: number;
  onAssign: () => void;
}

export interface ApplicantsTableProps {
  projectId?: string;
  issueId?: number;
  repoId: number;
  onAssign: () => void;
}
