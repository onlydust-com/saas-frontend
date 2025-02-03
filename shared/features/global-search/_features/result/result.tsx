import { Command } from "cmdk";
import { GitFork, Star, User } from "lucide-react";

import { SearchRessourceType } from "@/core/domain/search/models/search.types";

import { NEXT_ROUTER } from "@/shared/constants/router";

import { ResultTemplate } from "./_components/result-template/result-template";
import { ResultProps } from "./result.types";

export function Result({ data }: ResultProps) {
  if (data.isProject() && data.project?.slug) {
    const tags = [
      ...(data?.project?.languages ?? []),
      ...(data?.project?.categories ?? []),
      ...(data?.project?.ecosystems ?? []),
    ];

    return (
      <Command.Item value={data.project?.name} className="group/item">
        <ResultTemplate
          href={NEXT_ROUTER.projects.details.root(data.project?.slug)}
          name={data.project?.name}
          description={data.project?.shortDescription}
          type={SearchRessourceType.PROJECT}
          tags={tags}
          metrics={[
            {
              icon: User,
              count: data?.project?.contributorCount ?? 0,
            },
            {
              icon: Star,
              count: data?.project?.starCount ?? 0,
            },
            { icon: GitFork, count: data?.project?.forkCount ?? 0 },
          ]}
        />
      </Command.Item>
    );
  }

  if (data.isContributor() && data.contributor?.githubLogin) {
    return (
      <Command.Item value={data.contributor?.githubLogin} className="group/item">
        <ResultTemplate
          href={NEXT_ROUTER.users.details.root(data.contributor?.githubLogin)}
          name={data.contributor?.githubLogin}
          description={data.contributor?.bio}
          type={SearchRessourceType.CONTRIBUTOR}
          metrics={[
            {
              count: data?.contributor?.contributionCount ?? 0,
              label: { token: "features:globalSearch.result.metrics.contributions" },
            },
            {
              count: data?.contributor?.projectCount ?? 0,
              label: { token: "features:globalSearch.result.metrics.projects" },
            },
            {
              count: data?.contributor?.pullRequestCount ?? 0,
              label: { token: "features:globalSearch.result.metrics.prs" },
            },
            {
              count: data?.contributor?.issueCount ?? 0,
              label: { token: "features:globalSearch.result.metrics.issues" },
            },
          ]}
        />
      </Command.Item>
    );
  }
  return null;
}
