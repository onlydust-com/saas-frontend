import { useMemo } from "react";

import { GetMyOrganizationsResponse } from "@/core/domain/github/github-contract.types";

export const useRepositoryCount = (organizations: GetMyOrganizationsResponse, selectedRepos: unknown[]) => {
  return useMemo(() => {
    return {
      selected: selectedRepos?.length || 0,
      total: organizations.reduce((acc, org) => {
        return acc + (org.repos || []).length;
      }, 0),
    };
  }, [organizations, selectedRepos]);
};
