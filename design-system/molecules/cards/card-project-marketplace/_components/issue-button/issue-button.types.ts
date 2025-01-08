export interface IssueButtonProps {
  issueCount: number;
  issueType: "AVAILABLE_ISSUE" | "GOOD_FIRST_ISSUE" | "ODHACK";
  slug: string;
}
