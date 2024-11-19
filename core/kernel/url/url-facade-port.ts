import { BaseQueriesDefaultParams } from "@/core/actions/type.actions";

export interface UrlFacadePort {
  validateUrl: (url: string) => string;
  validateGithubIssueUrl: (url: string) => boolean;
  validateGithubPullRequestUrl: (url: string) => boolean;
  convertParamsToURLSearchParams: (params?: BaseQueriesDefaultParams) => URLSearchParams | undefined;
}
