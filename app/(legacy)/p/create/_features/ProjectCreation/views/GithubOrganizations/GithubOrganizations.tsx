import Card from "@/legacy/src/components/Card";
import { GithubSyncSettings } from "@/legacy/src/components/New/Ui/GithubSyncSettings";
import { useContext } from "react";

import { MultiStepsForm } from "@/app/(legacy)/p/create/_features/ProjectCreation/components/MultiStepsForm";

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
      title={"Which Github organisations are concerned?"}
      description={
        "Please install the github app on the desired github organisation(s) containing the repositories you want to add."
      }
      step={1}
      stepCount={3}
      next={next}
      nextDisabled={!organizations.length}
    >
      <Card withBg={false}>
        <h2 className="font-medium uppercase">{"Installed on these organizations"}</h2>
        <OrganizationList
          installatedRepo={installedRepos || []}
          organizations={installedOrganizations}
          emptyListFallBackText={"Not installed on any organization."}
          loading={organizationsLoading}
          disabledTooltip={"Github app installed by an organisation admin"}
        />
      </Card>

      <Card withBg={false} className="mt-6">
        <h2 className="font-medium uppercase">{"Available organizations"}</h2>
        <OrganizationList
          installatedRepo={installedRepos || []}
          organizations={availableOrganizations}
          emptyListFallBackText={"You have no organization available."}
          loading={organizationsLoading}
        />
      </Card>
      <div className="mt-6">
        <GithubSyncSettings
          title={"Github Settings"}
          showButton={"Show me how."}
          settingsButton={"Edit configuration"}
          message={
            "Missing an organisation? Edit your configuration and make sure the desired organisations are granted."
          }
          PoolingFeedback={PoolingFeedback}
        />
      </div>
    </MultiStepsForm>
  );
};

export default GithubOrganizationPage;
