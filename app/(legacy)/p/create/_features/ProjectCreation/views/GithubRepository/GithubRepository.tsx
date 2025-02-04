import { AddMissingRepositories } from "@/legacy/components/features/add-missing-repositories/add-missing-repositories";
import { VerticalListItemDrop } from "@/legacy/src/components/New/Cards/VerticalListItemDrop";
import { FieldCheckbox } from "@/legacy/src/components/New/Field/Checkbox";
import { FieldInput } from "@/legacy/src/components/New/Field/Input";
import { Flex } from "@/legacy/src/components/New/Layout/Flex";
import { useSearchHotKey } from "@/legacy/src/hooks/useSearchHotKey/useSearchHotKey";
import SearchLine from "@/legacy/src/icons/SearchLine";
import { getGithubSetupLink } from "@/legacy/src/utils/githubSetupLink";
import { sortBy } from "lodash";
import { useCallback, useContext, useMemo, useRef } from "react";
import { Controller } from "react-hook-form";

import { MultiStepsForm } from "@/app/(legacy)/p/create/_features/ProjectCreation/components/MultiStepsForm";

import { CreateProjectContext } from "../../ProjectCreation.context";
import { FormInformationCount } from "./components/FormInformationCount";
import { useRepositoryCount } from "./hooks/useRepositoryCount";
import { useRepositorySearch } from "./hooks/useRepositorySearch";

export const GithubRepositoryPage = () => {
  const {
    organizations,
    form,
    helpers: { next, prev },
    formFn: { addRepository, removeRepository },
  } = useContext(CreateProjectContext);
  const searchInputRef = useRef<HTMLInputElement>(null);
  useSearchHotKey({ inputRef: searchInputRef });

  const installedOrganizations = organizations.filter(org => org.installationStatus !== "NOT_INSTALLED");

  const selectedRepos = form.watch("selectedRepos") || [];
  const search = form.watch("search");
  const selectedReposCounts = useRepositoryCount(organizations, selectedRepos);
  const footerRightElement = FormInformationCount(selectedReposCounts.selected, selectedReposCounts.total);
  const filterOrganizationBySearch = useRepositorySearch(search);
  const filteredOrganizations = useMemo(
    () => filterOrganizationBySearch(installedOrganizations),
    [organizations, filterOrganizationBySearch]
  );

  const isSelected = useCallback(
    (repoId: number) => !!selectedRepos.find(repo => repo.repoId === repoId),
    [selectedRepos]
  );
  return (
    <MultiStepsForm
      title={"Which repositories will you need?"}
      description={"Only repositories from organisation where github app is installed are listed."}
      step={2}
      stepCount={3}
      prev={prev}
      next={next}
      footerRightElement={footerRightElement}
      nextDisabled={!selectedRepos?.length}
      stickyChildren={
        <Controller
          name="search"
          control={form.control}
          render={props => (
            <FieldInput
              placeholder={"Search repositories"}
              {...props.field}
              {...props.fieldState}
              ref={searchInputRef}
              startIcon={({ className }) => <SearchLine className={className} />}
            />
          )}
        />
      }
    >
      <Flex direction="col" gap={8}>
        <Controller
          name="selectedRepos"
          control={form.control}
          render={() => (
            <>
              {filteredOrganizations.length > 0 ? (
                filteredOrganizations.map(organization => {
                  const linkUrl = getGithubSetupLink({
                    id: organization.githubUserId,
                    login: organization.login,
                    installationId: organization.installationId,
                    installed: organization.installationStatus !== "NOT_INSTALLED",
                    isAPersonalOrganization: organization.isPersonal,
                  });

                  return (
                    <VerticalListItemDrop
                      key={organization.login}
                      title={organization.name || organization.login || ""}
                      avatarAlt={organization.login || ""}
                      avatarSrc={organization.avatarUrl || ""}
                      variant="BLUE"
                    >
                      {organization.repos.length === 0 ? (
                        <p className="text-body-s mb-2">{"No repositories available"}</p>
                      ) : (
                        <div className="grid grid-flow-row grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
                          {(sortBy(organization.repos, "name") || []).map(repo => (
                            <label
                              key={repo.name}
                              className="border-card-border-heavy bg-card-background-heavy shadow-heavy flex basis-1/2 cursor-pointer flex-col gap-2 rounded-2xl border p-5"
                            >
                              <Flex justify="start" item="start" direction="col" gap={2}>
                                <Flex justify="between" item="center" className="w-full">
                                  <h3 className="h- text-body-m-bold">{repo.name}</h3>
                                  <FieldCheckbox
                                    value={isSelected(repo.id)}
                                    name={`repository-${repo.id}`}
                                    fieldClassName={"inline-flex w-auto"}
                                    onChange={() => {
                                      if (!isSelected(repo.id)) {
                                        addRepository({ repoId: repo.id, orgId: organization.githubUserId });
                                      } else {
                                        removeRepository({ repoId: repo.id, orgId: organization.githubUserId });
                                      }
                                    }}
                                  />
                                </Flex>
                                <p
                                  className={`text-body-s text-greyscale-200 line-clamp-2 w-full ${
                                    !repo.description && "italic"
                                  }`}
                                >
                                  {repo.description || "This repository has no description"}
                                </p>
                              </Flex>
                            </label>
                          ))}
                        </div>
                      )}

                      <AddMissingRepositories
                        url={linkUrl}
                        disabled={!organization.isCurrentUserAdmin}
                        tooltip={"Github app installed by an organisation admin"}
                        backgroundColor="blue"
                        className="border-card-border-heavy mt-5 border"
                      />
                    </VerticalListItemDrop>
                  );
                })
              ) : (
                <p className="text-body-s mb-2">No repositories available</p>
              )}
            </>
          )}
        />
      </Flex>
    </MultiStepsForm>
  );
};

export default GithubRepositoryPage;
