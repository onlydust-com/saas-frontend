export enum ContributionType {
  PULL_REQUEST = "PULL_REQUEST",
  ISSUE = "ISSUE",
}

export const REGEX_VALID_GITHUB_PULL_REQUEST_URL = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/pull\/(\d+)\/?$/;
export const REGEX_VALID_GITHUB_ISSUE_URL = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/issues\/(\d+)\/?$/;
