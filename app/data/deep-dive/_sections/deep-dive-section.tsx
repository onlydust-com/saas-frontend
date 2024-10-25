import { ChevronRight, Folder, User } from "lucide-react";
import { useMemo, useState } from "react";

import { ContributorsTable } from "@/app/data/deep-dive/_features/contributors-table/contributors-table";
import { ProjectsTable } from "@/app/data/deep-dive/_features/projects-table/projects-table";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { Translate } from "@/shared/translation/components/translate/translate";

const CONTRIBUTOR = "contributor";
const PROJECTS = "projects";

export function DeepDiveSection() {
  const { close } = useSidePanelsContext();
  const [toggleDataViews, setToggleDataViews] = useState<typeof CONTRIBUTOR | typeof PROJECTS>(CONTRIBUTOR);

  const renderDataView = useMemo(() => {
    if (toggleDataViews === CONTRIBUTOR) {
      return <ContributorsTable />;
    }

    return <ProjectsTable />;
  }, [toggleDataViews]);

  function handleToggleDataViews(view: string) {
    close();
    setToggleDataViews(view as typeof CONTRIBUTOR | typeof PROJECTS);
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-col flex-wrap items-start justify-between gap-2 tablet:flex-row tablet:items-center">
        <Typo size={"xs"} weight={"medium"} variant={"heading"} translate={{ token: "data:deepDive.header.title" }} />
        <div className="flex max-w-full flex-1 items-center justify-between gap-2">
          <Tabs
            onTabClick={handleToggleDataViews}
            variant={"solid"}
            tabs={[
              {
                id: CONTRIBUTOR,
                children: <Translate token={"data:details.dataSection.tabs.contributor"} />,
                startIcon: { component: User },
              },
              {
                id: PROJECTS,
                children: <Translate token={"data:details.dataSection.tabs.project"} />,
                startIcon: { component: Folder },
              },
            ]}
            selectedId={toggleDataViews}
          />
          <div className={"flex items-center gap-lg"}>
            <Button
              as={BaseLink}
              htmlProps={{
                href: NEXT_ROUTER.data.root,
              }}
              variant={"primary"}
              endIcon={{ component: ChevronRight }}
              isTextButton
              size={"md"}
              translate={{ token: "data:deepDive.header.ctaGraph" }}
              classNames={{
                base: "max-w-full overflow-hidden",
                label: "whitespace-nowrap text-ellipsis overflow-hidden",
              }}
            />
          </div>
        </div>
      </div>

      {renderDataView}
    </div>
  );
}
