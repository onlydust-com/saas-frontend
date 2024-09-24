import { ChevronRight, Folder, User } from "lucide-react";
import { useMemo, useState } from "react";

import { ContributorHistogramChart } from "@/app/data/_sections/data-section/components/histograms/contributor-histogram-chart/contributor-histogram-chart";
import { ProjectHistogramChart } from "@/app/data/_sections/data-section/components/histograms/project-histogram-chart/project-histogram-chart";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { Translate } from "@/shared/translation/components/translate/translate";

const CONTRIBUTOR = "contributor";
const PROJECTS = "projects";

export function DataSection() {
  const [toggleDataViews, setToggleDataViews] = useState<typeof CONTRIBUTOR | typeof PROJECTS>(CONTRIBUTOR);

  const renderDataView = useMemo(() => {
    if (toggleDataViews === CONTRIBUTOR) {
      return <ContributorHistogramChart />;
    }

    return <ProjectHistogramChart />;
  }, [toggleDataViews]);

  function handleToggleDataViews(view: string) {
    setToggleDataViews(view as typeof CONTRIBUTOR | typeof PROJECTS);
  }

  return (
    <div className="flex w-full flex-col gap-4 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-lg">
        <Typo size={"xs"} weight={"medium"} variant={"heading"} translate={{ token: "data:details.content.title" }} />
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
                href: NEXT_ROUTER.data.deepDive.root,
              }}
              variant={"primary"}
              endIcon={{ component: ChevronRight }}
              isTextButton
              size={"md"}
              translate={{ token: "data:details.dataSection.buttons.deepDive" }}
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
