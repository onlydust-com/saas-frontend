import { GetMyOrganizationsResponse } from "@/core/domain/github/github-contract.types";

interface onSyncOrganizationsInterface {
  selectedRepos: number[];
  organizations: GetMyOrganizationsResponse;
}
export const onSyncOrganizations = ({ selectedRepos, organizations }: onSyncOrganizationsInterface) => {
  if (selectedRepos?.length && organizations) {
    const allRepos = organizations.flatMap(o => o.repos).map(r => r.id);
    return selectedRepos?.filter(repo => allRepos.includes(repo));
  }

  return undefined;
};
