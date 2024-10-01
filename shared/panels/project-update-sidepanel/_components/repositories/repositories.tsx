import { Trash } from "lucide-react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { GithubReactQueryAdapter } from "@/core/application/react-query-adapter/github";
import { GithubRepoInterface } from "@/core/domain/github/models/github-repo-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";
import { Accordion } from "@/design-system/molecules/accordion";
import { CardGithubRepo } from "@/design-system/molecules/cards/card-github-repo";

import { useAddRepoToProjectSidePanel } from "@/shared/panels/project-update-sidepanel/_features/add-repo-to-project-side-panel/add-repo-to-project-side-panel.hooks";
import { EditProjectFormData } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.types";

import { RepositoriesProps } from "./repositories.types";

function Repo({
  repo,
  onRemoveRepo,
  githubRepos,
}: {
  repo: GithubRepoInterface;
  onRemoveRepo: (repoId: number) => void;
  githubRepos: number[];
}) {
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
}

export function Repositories({ project }: RepositoriesProps) {
  const { open } = useAddRepoToProjectSidePanel();
  const { watch, setValue } = useFormContext<EditProjectFormData>();
  const githubRepos = watch("githubRepoIds");
  const { data: userOrganizations } = GithubReactQueryAdapter.client.useGetMyOrganizations({});

  const organizations = useMemo(() => {
    return project?.organizations.filter(org => org.isContainsRepo(githubRepos || []));
  }, [project, githubRepos, userOrganizations]);

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
          {organization.repos.map(repo => (
            <Repo key={repo.id} repo={repo} onRemoveRepo={onRemoveRepo} githubRepos={githubRepos || []} />
          ))}
        </div>
      ))}
      <div className={"w-full"}>
        <Button
          translate={{ token: "panels:projectUpdate.repositories.addRepoButton" }}
          variant={"secondary"}
          classNames={{ base: "w-full" }}
          onClick={() => open({ projectId: project.id })}
        />
      </div>
    </Accordion>
  );
}
