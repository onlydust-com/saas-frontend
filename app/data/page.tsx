"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useMemo, useState } from "react";

import { ContributorsViews } from "@/app/data/views/contributors-views/contributors-views";
import { OverviewView } from "@/app/data/views/overview-view/overview-view";
import { ProjectsViews } from "@/app/data/views/projects-views/projects-views";

import { withClientOnly } from "@/shared/components/client-only/client-only";

enum tabs {
  "OVERVIEW" = "OVERVIEW",
  "PROJECTS" = "PROJECTS",
  "CONTRIBUTORS" = "CONTRIBUTORS",
}
function DataPage() {
  const [toggleViews, setToggleViews] = useState<tabs>(tabs.OVERVIEW);

  const renderActivityView = useMemo(() => {
    const isViewOverview = toggleViews === tabs.OVERVIEW;
    const isViewProjects = toggleViews === tabs.PROJECTS;
    const isViewContributors = toggleViews === tabs.CONTRIBUTORS;

    if (isViewOverview) {
      return <OverviewView />;
    }

    if (isViewProjects) {
      return <ProjectsViews />;
    }

    if (isViewContributors) {
      return <ContributorsViews />;
    }
  }, [toggleViews]);

  function handleToggleActivityViews(view: string) {
    close();
    setToggleViews(view as tabs);
  }

  return <div>coucou</div>;
}

export default withClientOnly(withAuthenticationRequired(DataPage));
