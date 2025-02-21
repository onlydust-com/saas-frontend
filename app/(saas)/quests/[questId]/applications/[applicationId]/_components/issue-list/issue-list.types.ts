import {
  ContributionGithubStatusUnion,
  ContributionTypeUnion,
} from "@/core/domain/contribution/models/contribution.types";

interface Issue {
  type: ContributionTypeUnion;
  githubStatus: ContributionGithubStatusUnion;
  number: number;
  title: string;
  createdAt: string;
  url: string;
  justifications: string;
  languages: {
    logoUrl: string;
    name: string;
  }[];
}
export interface IssueListProps {
  containerClassName?: string;
  title: string;
  emptyMessage: string;
  errorMessage: string;
  description: string;
  issues: Issue[];
  isError?: boolean;
  isLoading?: boolean;
}
