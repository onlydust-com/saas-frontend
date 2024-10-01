import { Trash } from "lucide-react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { Typo } from "@/design-system/atoms/typo";
import { Accordion } from "@/design-system/molecules/accordion";
import { CardGithubRepo } from "@/design-system/molecules/cards/card-github-repo";

import { EditProjectFormData } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.types";

import { RepositoriesProps } from "./repositories.types";

export function Repositories({ project }: RepositoriesProps) {
  const { watch, setValue } = useFormContext<EditProjectFormData>();

  const githubRepos = watch("githubRepoIds");

  const organizations = useMemo(() => {
    return project?.organizations.filter(org => org.isContainsRepo(githubRepos || []));
  }, [project, githubRepos]);

  function onRemoveRepo(repoId: number) {
    const newGithubRepos = (githubRepos || []).filter(ids => ids !== repoId);
    setValue("githubRepoIds", newGithubRepos, { shouldDirty: true, shouldValidate: true });
  }

  return (
    <Accordion
      defaultSelected={["repositories"]}
      id={"repositories"}
      titleProps={{ translate: { token: "panels:projectUpdate.repositories.title" } }}
    >
      {organizations.map(organization => (
        <div key={organization.name} className={"flex w-full flex-col gap-md"}>
          <Typo size={"xs"} color={"secondary"}>
            {organization.name}
          </Typo>
          {organization.repos.map(repo => {
            const isRepoIncluded = repo.isRepoIncluded(githubRepos || []);

            if (!isRepoIncluded) return null;

            return (
              <CardGithubRepo
                key={repo.id}
                name={repo.name}
                description={repo.description}
                starsCount={repo.stars}
                // TODO : add prCount
                prCount={repo.forkCount}
                topActions={{
                  iconOnly: true,
                  startIcon: { component: Trash },
                  onClick: () => onRemoveRepo(repo.id),
                }}
              />
            );
          })}
        </div>
      ))}
    </Accordion>
  );
}
