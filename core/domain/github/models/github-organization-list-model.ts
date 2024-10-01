import { GithubOrganization, GithubOrganizationInterface } from "@/core/domain/github/models/github-organization-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type GithubOrganizationResponse = {
  organizations: components["schemas"]["GithubOrganizationResponse"][];
};

interface filterOptions {
  search?: string | null;
}

export interface GithubOrganizationListInterface {
  organizations: GithubOrganizationInterface[];
  getInstalledOrganizations(filter?: filterOptions): GithubOrganizationInterface[];
  getNotInstalledOrganizations(filter?: filterOptions): GithubOrganizationInterface[];
}

export class GithubOrganizationList implements GithubOrganizationListInterface {
  organizations: GithubOrganizationInterface[];

  constructor({ organizations }: GithubOrganizationResponse) {
    this.organizations = organizations.map(organization => new GithubOrganization(organization));
  }

  private searchOrganizationBy(organizations: GithubOrganizationInterface[], search?: string | null) {
    if (!search) return organizations;

    const filterOrganizationByRepoName = organizations.filter(organization => {
      return organization.repos.some(repo => repo.name.toLowerCase().includes(search.toLowerCase()));
    });

    const filterOrganizationByName = organizations.filter(organization => {
      return organization.name.toLowerCase().includes(search.toLowerCase());
    });

    return [...new Set([...filterOrganizationByRepoName, ...filterOrganizationByName])];
  }

  private filterOrganization(filter?: filterOptions) {
    if (!filter) return this.organizations;

    const { search } = filter;

    return this.searchOrganizationBy(this.organizations, search);
  }

  getInstalledOrganizations(filter?: filterOptions) {
    const organizations = this.filterOrganization(filter);
    return organizations.filter(organization => organization.isInstalled());
  }

  getNotInstalledOrganizations(filter?: filterOptions) {
    const organizations = this.filterOrganization(filter);
    return organizations.filter(organization => !organization.isInstalled());
  }
}
