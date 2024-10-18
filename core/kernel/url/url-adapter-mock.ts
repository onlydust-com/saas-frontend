import { UrlFacadePort } from "./url-facade-port";

export const UrlAdapterMock: UrlFacadePort = {
  validateUrl: (_url: string) => "https://example.com",
  validateGithubIssueUrl: (_url: string) => true,
  validateGithubPullRequestUrl: (_url: string) => true,
};
