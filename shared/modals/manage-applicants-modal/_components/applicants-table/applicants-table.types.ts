export interface ApplicantsTableProps {
  projectId?: string;
  contributionId: string;
  onAssign: (githubUserId: number) => void;
}
