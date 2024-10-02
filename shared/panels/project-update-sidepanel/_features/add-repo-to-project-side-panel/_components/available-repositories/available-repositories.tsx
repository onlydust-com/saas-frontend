import { Plus } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { GithubOrganizationInterface } from "@/core/domain/github/models/github-organization-model";
import { GithubRepoInterface } from "@/core/domain/github/models/github-repo-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Input } from "@/design-system/atoms/input";
import { Typo } from "@/design-system/atoms/typo";
import { Accordion } from "@/design-system/molecules/accordion";
import { CardGithubRepo } from "@/design-system/molecules/cards/card-github-repo";

import { Github } from "@/shared/icons";
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
      forkCount={repo.forkCount}
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
  search,
}: {
  organization: GithubOrganizationInterface;
  githubRepos: number[];
  search: string | null;
  onAddRepo: onAddRepo;
}) {
  const filteredRepos = organization.searchRepo(search);

  if (!filteredRepos?.length || !filteredRepos.filter(r => !r.isRepoIncluded(githubRepos)).length) return null;

  return (
    <div key={organization.name} className={"flex w-full flex-col gap-md"}>
      <div className={"flex w-full items-center justify-between gap-1 overflow-hidden"}>
        <Typo
          size={"xs"}
          color={"secondary"}
          classNames={{ base: "flex-1 overflow-ellipsis overflow-hidden whitespace-nowrap" }}
        >
          {organization.name}
        </Typo>
        {organization.isCurrentUserAdmin ? (
          <Button
            as={"a"}
            htmlProps={{
              target: "_blank",
              href: organization.getGithubManagementUrl(),
            }}
            size={"xs"}
            startIcon={{ component: Github }}
            variant={"secondary"}
            translate={{ token: "panels:projectUpdate.addRepoPanel.repositories.manage" }}
          />
        ) : (
          <Button
            size={"xs"}
            startIcon={{ component: Github }}
            variant={"secondary"}
            translate={{ token: "panels:projectUpdate.addRepoPanel.repositories.manage" }}
            isDisabled={true}
          />
        )}
      </div>
      {filteredRepos.map(repo => (
        <Repo key={repo.id} organization={organization} repo={repo} onAddRepo={onAddRepo} githubRepos={githubRepos} />
      ))}
    </div>
  );
}

export function AvailableRepositories({ organizations, project }: AvailableRepositoriesProps) {
  const { t } = useTranslation("panels");
  const { watch, setValue } = useFormContext<EditProjectFormData>();
  const githubRepos = watch("githubRepoIds");
  const [search, setSearch] = useState<string | null>(null);

  function onAddRepo(repo: GithubRepoInterface, org: GithubOrganizationInterface) {
    const newGithubRepos = (githubRepos || []).filter(ids => ids !== repo.id);
    const findProjectOrganization = project.organizations.find(
      projectOrg => projectOrg.githubUserId === org.githubUserId
    );

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
        <Input
          name={"search-available"}
          onChange={e => setSearch(e.target.value)}
          value={search ?? ""}
          placeholder={t("projectUpdate.addRepoPanel.repositories.search")}
        />
      </div>
      {organizations.map(organization => (
        <Organization
          key={organization.name}
          organization={organization}
          onAddRepo={onAddRepo}
          githubRepos={githubRepos ?? []}
          search={search}
        />
      ))}
    </Accordion>
  );
}
