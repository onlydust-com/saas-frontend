import { GithubRepo, GithubRepoInterface } from "@/core/domain/github/models/github-repo-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type GithubOrganizationResponse = components["schemas"]["GithubOrganizationResponse"];

export interface GithubOrganizationInterface
  extends Omit<components["schemas"]["GithubOrganizationResponse"], "repos"> {
  repos: GithubRepoInterface[];
  isContainsRepo(repoIds: number[]): boolean;
}

export class GithubOrganization implements GithubOrganizationInterface {
  githubUserId!: GithubOrganizationInterface["githubUserId"];
  login!: GithubOrganizationInterface["login"];
  avatarUrl!: GithubOrganizationInterface["avatarUrl"];
  name!: GithubOrganizationInterface["name"];
  htmlUrl!: GithubOrganizationInterface["htmlUrl"];
  isCurrentUserAdmin!: GithubOrganizationInterface["isCurrentUserAdmin"];
  isPersonal!: GithubOrganizationInterface["isPersonal"];
  installationId!: GithubOrganizationInterface["installationId"];
  installationStatus!: GithubOrganizationInterface["installationStatus"];
  repos!: GithubOrganizationInterface["repos"];

  constructor({ repos, ...props }: GithubOrganizationResponse) {
    Object.assign(this, props);
    this.repos = repos.map(repo => new GithubRepo(repo));
  }

  isContainsRepo(repoIds: number[]) {
    return this.repos.some(repo => repoIds.includes(repo.id));
  }
}
