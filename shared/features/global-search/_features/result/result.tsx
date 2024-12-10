import { Command } from "cmdk";
import { GitFork, Star, User } from "lucide-react";

import { ResultTemplate } from "./_components/result-template/result-template";
import { ResultProps } from "./result.types";

export function Result({ data }: ResultProps) {
  if (data.isProject()) {
    const tags = [
      ...(data?.project?.languages ?? []),
      ...(data?.project?.categories ?? []),
      ...(data?.project?.ecosystems ?? []),
    ];

    return (
      <Command.Item value={data.project?.name} className="group/item">
        <ResultTemplate
          name={data.project?.name}
          description={data.project?.shortDescription}
          type="project"
          tags={tags}
          metrics={[
            { icon: User, count: data?.project?.contributorCount ?? 0 },
            { icon: Star, count: data?.project?.starCount ?? 0 },
            { icon: GitFork, count: data?.project?.forkCount ?? 0 },
          ]}
        />
      </Command.Item>
    );
  }

  if (data.isContributor()) {
    return (
      <Command.Item value={data.contributor?.githubLogin} className="group/item">
        <ResultTemplate
          name={data.contributor?.githubLogin}
          description={data.contributor?.bio}
          type="contributor"
          // metrics={[
          //   { icon: User, count: data?.project?.contributorCount ?? 0 },
          //   { icon: Star, count: data?.project?.starCount ?? 0 },
          //   { icon: GitFork, count: data?.project?.forkCount ?? 0 },
          // ]}
        />
      </Command.Item>
    );
  }
  return null;
}
