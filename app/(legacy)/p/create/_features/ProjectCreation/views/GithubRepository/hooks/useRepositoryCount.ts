import { useMemo } from "react";

import { UseGithubOrganizationsResponse } from "@/legacy/src/api/me/queries";

export const useRepositoryCount = (organizations: UseGithubOrganizationsResponse[], selectedRepos: unknown[]) => {
  return useMemo(() => {
    return {
      selected: selectedRepos?.length || 0,
      total: organizations.reduce((acc, org) => {
        return acc + (org.repos || []).length;
      }, 0),
    };
  }, [organizations, selectedRepos]);
};
