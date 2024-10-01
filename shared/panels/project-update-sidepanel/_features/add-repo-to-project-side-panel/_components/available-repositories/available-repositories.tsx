import { Plus } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { GithubOrganizationInterface } from "@/core/domain/github/models/github-organization-model";
import { GithubRepoInterface } from "@/core/domain/github/models/github-repo-model";

import { Input } from "@/design-system/atoms/input";
import { Typo } from "@/design-system/atoms/typo";
import { Accordion } from "@/design-system/molecules/accordion";
import { CardGithubRepo } from "@/design-system/molecules/cards/card-github-repo";

import { EditProjectFormData } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.types";

import { AvailableRepositoriesProps } from "./available-repositories.types";

type onAddRepo = (repo: GithubRepoInterface, org: GithubOrganizationInterface) => void;

function Repo({
  organization,
  repo,
  onAddRepo,
  githubRepos,
}: {
  organization: GithubOrganizationInterface;
  repo: GithubRepoInterface;
  onAddRepo: onAddRepo;
  githubRepos: number[];
}) {
  const isRepoIncluded = repo.isRepoIncluded(githubRepos || []);

  if (isRepoIncluded) return null;

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
        startIcon: { component: Plus },
        onClick: () => onAddRepo(repo, organization),
      }}
    />
  );
}

function Organization({
  organization,
  githubRepos,
  onAddRepo,
}: {
  organization: GithubOrganizationInterface;
  githubRepos: number[];
  onAddRepo: onAddRepo;
}) {
  if (!organization.repos.filter(r => !r.isRepoIncluded(githubRepos)).length) return null;

  return (
    <div key={organization.name} className={"flex w-full flex-col gap-md"}>
      <Typo size={"xs"} color={"secondary"}>
        {organization.name}
      </Typo>
      {organization.repos.map(repo => (
        <Repo key={repo.id} organization={organization} repo={repo} onAddRepo={onAddRepo} githubRepos={githubRepos} />
      ))}
    </div>
  );
}

export function AvailableRepositories({ organizations, project, onSearch, search }: AvailableRepositoriesProps) {
  const { watch, setValue } = useFormContext<EditProjectFormData>();
  const githubRepos = watch("githubRepoIds");

  function onAddRepo(repo: GithubRepoInterface, org: GithubOrganizationInterface) {
    const newGithubRepos = (githubRepos || []).filter(ids => ids !== repo.id);
    const findProjectOrganization = project.organizations.find(projectOrg => projectOrg.name === org.name);

    if (!findProjectOrganization) {
      project.addOrganizationToProject(org);
    }

    setValue("githubRepoIds", [...newGithubRepos, repo.id], { shouldDirty: true, shouldValidate: true });
  }

  return (
    <Accordion
      defaultSelected={["repositories"]}
      id={"repositories"}
      titleProps={{ translate: { token: "panels:projectUpdate.addRepoPanel.repositories.title" } }}
    >
      <div>
        <Input name={"search-available"} onChange={e => onSearch(e.target.value)} value={search} />
      </div>
      {organizations.map(organization => (
        <Organization
          key={organization.name}
          organization={organization}
          onAddRepo={onAddRepo}
          githubRepos={githubRepos ?? []}
        />
      ))}
    </Accordion>
  );
}
