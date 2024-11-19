import { BaseQueriesDefaultParams } from "@/core/actions/type.actions";

import { UrlFacadePort } from "./url-facade-port";

const REGEX_VALID_GITHUB_PULL_REQUEST_URL = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/pull\/(\d+)\/?$/;
const REGEX_VALID_GITHUB_ISSUE_URL = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/issues\/(\d+)\/?$/;

export const UrlAdapter: UrlFacadePort = {
  validateUrl: (url: string) => (url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`),
  validateGithubIssueUrl: (url: string) => REGEX_VALID_GITHUB_ISSUE_URL.test(url),
  validateGithubPullRequestUrl: (url: string) => REGEX_VALID_GITHUB_PULL_REQUEST_URL.test(url),

  convertParamsToURLSearchParams: (params?: BaseQueriesDefaultParams) => {
    if (!params) return undefined;
    return Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        if (typeof value === "string" || typeof value === "number") {
          acc.append(key, value.toString());
        }
        if (typeof value === "boolean") {
          if (value) {
            acc.append(key, "true");
          } else {
            acc.append(key, "false");
          }
        }
      }
      return acc;
    }, new URLSearchParams());
  },
};
