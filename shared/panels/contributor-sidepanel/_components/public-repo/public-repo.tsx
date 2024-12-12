import { Accordion } from "@/design-system/molecules/accordion";
import { CardGithubRepo } from "@/design-system/molecules/cards/card-github-repo";

import { PublicRepoProps } from "./public-repo.types";

export function PublicRepo({ repos }: PublicRepoProps) {
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
