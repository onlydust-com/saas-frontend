import { useContext } from "react";

import { MultiStepsForm } from "../../components/MultiStepsForm";
import { GithubSyncSettings } from "./components/GithubSyncSettings";

import { CreateProjectContext } from "../../ProjectCreation.context";
import OrganizationList from "./components/OrganizationList";

export const GithubOrganizationPage = () => {
  const {
    helpers: { next },
    installedRepos,
    organizations,
    organizationsLoading,
    PoolingFeedback,
  } = useContext(CreateProjectContext);

  const installedOrganizations = organizations.filter(org => org.installationStatus !== "NOT_INSTALLED");
  const availableOrganizations = organizations.filter(
    org => org.installationStatus === "NOT_INSTALLED" && org.isCurrentUserAdmin
  );

  return (
    <MultiStepsForm
      title="Select GitHub Organizations"
      description="Choose the organizations you want to create projects from"
      step={1}
      stepCount={3}
      next={next}
      nextDisabled={!organizations.length}
    >
      <div> 
        <h2 className="font-medium uppercase">Installed Organizations</h2>
        <OrganizationList
          installatedRepo={installedRepos || []}
          organizations={installedOrganizations}
          emptyListFallBackText="No installed organizations found"
          loading={organizationsLoading}
          disabledTooltip="This organization was installed by an admin"
        />
      </div>

      <div className="mt-6">
        <h2 className="font-medium uppercase">Available Organizations</h2>
        <OrganizationList
          installatedRepo={installedRepos || []}
          organizations={availableOrganizations}
          emptyListFallBackText="No available organizations found"
          loading={organizationsLoading}
        />
      </div>
      <div className="mt-6">
        <GithubSyncSettings
          title="GitHub App Information"
          showButton="Show Details"
          settingsButton="Settings"
          message="Configure your GitHub App settings to manage organization access"
          PoolingFeedback={PoolingFeedback}
        />
      </div>
    </MultiStepsForm>
  );
};

export default GithubOrganizationPage;
