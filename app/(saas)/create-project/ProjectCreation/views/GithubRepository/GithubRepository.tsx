import { sortBy } from "lodash";
import { useCallback, useContext, useMemo } from "react";
import { Controller } from "react-hook-form";

import { CheckboxButton } from "@/design-system/molecules/checkbox-button";
import { MultiStepsForm } from "../../components/MultiStepsForm";
import { getGithubSetupLink } from "../../utils/githubSetupLink";

import { AddMissingRepositories } from "./components/add-missing-repositories/add-missing-repositories";

import { Accordion } from "@/design-system/molecules/accordion";
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
  // TODO
  // const searchInputRef = useRef<HTMLInputElement>(null);
  // useSearchHotKey({ inputRef: searchInputRef });

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
      title="Add your GitHub repositories"
      description="Select the repositories you want to manage in your project"
      step={2}
      stepCount={3}
      prev={prev}
      next={next}
      footerRightElement={footerRightElement}
      nextDisabled={!selectedRepos?.length}
      // TODO
      // stickyChildren={
      //   <Controller
      //     name="search"
      //     control={form.control}
      //     render={props => (
      //       <Input
      //         placeholder="Search repositories..."
      //         {...props.field}
      //         {...props.fieldState}
      //         ref={searchInputRef}
      //         startContent={<Search />}
      //       />
      //     )}
      //   />
      // }
    >
      <div className="flex flex-col gap-8">
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
                    <Accordion
                      key={organization.login}
                      id={organization.login}
                      titleProps={{}}

                      // TODO
                      // title={organization.name || organization.login || ""}
                      // avatarAlt={organization.login || ""}
                      // avatarSrc={organization.avatarUrl || ""}
                      // variant="BLUE"
                    >
                      {organization.repos.length === 0 ? (
                        <p className="text-body-s mb-2">No repositories found</p>
                      ) : (
                        <div className="grid grid-flow-row grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
                          {(sortBy(organization.repos, "name") || []).map(repo => (
                            <label
                              key={repo.name}
                              className="flex basis-1/2 cursor-pointer flex-col gap-2 rounded-2xl border border-card-border-heavy bg-card-background-heavy p-5 shadow-heavy"
                            >
                              <div className="flex flex-col items-start justify-start gap-2">
                                <div className="flex items-center justify-between w-full">
                                  <h3 className="h- text-body-m-bold">{repo.name}</h3>
                                  <CheckboxButton
                                    value={isSelected(repo.id)}
                                    onChange={() => {
                                      if (!isSelected(repo.id)) {
                                        addRepository({ repoId: repo.id, orgId: organization.githubUserId });
                                      } else {
                                        removeRepository({ repoId: repo.id, orgId: organization.githubUserId });
                                      }
                                    }}
                                  />
                                </div>                               <p
                                  className={`text-body-s line-clamp-2 w-full text-greyscale-200 ${
                                    !repo.description && "italic"
                                  }`}
                                >
                                  {repo.description || "No description available"}
                                </p>
                              </div>                            </label>
                          ))}
                        </div>
                      )}

                      <AddMissingRepositories
                        url={linkUrl}
                        disabled={!organization.isCurrentUserAdmin}
                        tooltip="Github app installed by an organisation admin"
                        className="mt-5 border border-card-border-heavy"
                      />
                    </Accordion>
                  );
                })
              ) : (
                <p className="text-body-s mb-2">No repositories found matching your search</p>
              )}
            </>
          )}
        />
      </div>
    </MultiStepsForm>
  );
};

export default GithubRepositoryPage;
