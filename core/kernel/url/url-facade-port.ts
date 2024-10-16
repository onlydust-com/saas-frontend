export interface UrlFacadePort {
  validateUrl: (url: string) => string;
  validateGithubIssueUrl: (url: string) => boolean;
  validateGithubPullRequestUrl: (url: string) => boolean;
}
