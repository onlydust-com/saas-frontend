export interface ContributorPanelFooterProps {
  login: string;
  applicationId?: string;
  contributionGithubId?: number;
  onAssign: () => void;
}

export interface ApplicantsTableProps {
  projectId?: string;
  issueId?: number;
  onAssign: () => void;
}
