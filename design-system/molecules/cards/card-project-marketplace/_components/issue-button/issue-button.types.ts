export type IssueCountType = "AVAILABLE_ISSUE" | "GOOD_FIRST_ISSUE" | "ODHACK";

export interface IssueButtonProps {
  issueCount: number;
  issueCountType: IssueCountType;
  slug: string;
}
