import { UrlFacadePort } from "./url-facade-port";

const REGEX_VALID_GITHUB_PULL_REQUEST_URL = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/pull\/(\d+)\/?$/;
const REGEX_VALID_GITHUB_ISSUE_URL = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/issues\/(\d+)\/?$/;

export const UrlAdapter: UrlFacadePort = {
  validateUrl: (url: string) => (url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`),
  validateGithubIssueUrl: (url: string) => REGEX_VALID_GITHUB_ISSUE_URL.test(url),
  validateGithubPullRequestUrl: (url: string) => REGEX_VALID_GITHUB_PULL_REQUEST_URL.test(url),
};
