export type IssueCountType = "AVAILABLE_ISSUE" | "GOOD_FIRST_ISSUE" | "ODHACK";

export interface IssueButtonProps {
  issueCount: number;
  totalIssueCount?: number;
  issueCountType: IssueCountType;
}
