import { Accordion } from "@/design-system/molecules/accordion";
import { CardGithubRepo } from "@/design-system/molecules/cards/card-github-repo";

import { PublicRepoProps } from "./public-repo.types";

export function PublicRepo(_: PublicRepoProps) {
  const repos = [
    {
      id: 650626566,
      owner: "onlydustxyz",
      name: "marketplace-backend",
      description: "Awesome repo",
      htmlUrl: "https://github.com/onlydustxyz/marketplace-backend",
      stars: 625,
      forkCount: 3,
      hasIssues: true,
      isIncludedInProject: true,
      isAuthorizedInGithubApp: true,
    },
    {
      id: 650626567,
      owner: "onlydustxyz",
      name: "marketplace-backend",
      description: "Awesome repo",
      htmlUrl: "https://github.com/onlydustxyz/marketplace-backend",
      stars: 625,
      forkCount: 3,
      hasIssues: true,
      isIncludedInProject: true,
      isAuthorizedInGithubApp: true,
    },
  ];

  if (!repos.length) {
    return null;
  }

  return (
    <Accordion
      id={"public-repo"}
      defaultSelected={["public-repo"]}
      titleProps={{ translate: { token: "panels:contributor.publicRepo.title", count: repos?.length || 0 } }}
    >
      <div className={"flex flex-col gap-md"}>
        {repos.map(repo => (
          <CardGithubRepo
            key={repo.id}
            name={repo.name}
            description={repo.description}
            starsCount={repo.stars}
            forkCount={repo.forkCount}
          />
        ))}
      </div>
    </Accordion>
  );
}
