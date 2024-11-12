import {
  ContributionGithubStatusUnion,
  ContributionTypeUnion,
} from "@/core/domain/contribution/models/contribution.types";

export interface LinkedIssuesProps {
  linkedIssues?: {
    type: ContributionTypeUnion;
    githubTitle: string;
    githubStatus: ContributionGithubStatusUnion;
    githubNumber: string | number;
  }[];
}
