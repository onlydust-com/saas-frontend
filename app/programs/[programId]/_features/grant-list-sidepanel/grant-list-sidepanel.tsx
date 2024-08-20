import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { AlreadyGrantedProjects } from "@/app/programs/[programId]/_features/grant-list-sidepanel/already-granted-projects";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Input } from "@/design-system/atoms/input";
import { AccordionWithBadge } from "@/design-system/molecules/accordion/variants/accordion-with-badge";

import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { Translate } from "@/shared/translation/components/translate/translate";

function Badge({ programId }: { programId: string }) {
  const { data: alreadyGrantedData } = ProgramReactQueryAdapter.client.useGetProgramProjects({
    pathParams: {
      programId,
    },
    options: {
      enabled: false,
    },
  });
  const alreadyGrantedCount = useMemo(() => alreadyGrantedData?.pages[0].totalItemNumber ?? null, [alreadyGrantedData]);

  return alreadyGrantedCount ?? "-";
}

export function GrantListSidepanel() {
  const { programId } = useParams();
  const [T] = useTranslation();
  const { Panel, open, close, isOpen } = useSidePanel({ name: "grant-list" });

  function togglePanel() {
    (isOpen ? close : open)();
  }

  return (
    <>
      <Button variant={"secondary-light"} size={"l"} onClick={togglePanel}>
        <Translate token={"programs:details.projects.grantProject"} />
      </Button>

      <Panel>
        <SidePanelHeader canClose={true} title={{ token: "programs:grantList.title" }} />

        <Input placeholder={T("programs:grantList.search")} startContent={<Icon name={"ri-search-line"} />} />

        <AccordionWithBadge
          items={[
            {
              id: "alreadyGranted",
              titleProps: { translate: { token: "programs:grantList.alreadyGranted" } },
              content: <AlreadyGrantedProjects programId={typeof programId === "string" ? programId : ""} />,
              badgeProps: {
                children: <Badge programId={typeof programId === "string" ? programId : ""} />,
              },
            },
            {
              id: "allProjects",
              titleProps: { translate: { token: "programs:grantList.allProjects" } },
              content: (
                <div className="flex flex-col gap-1">
                  <p>Accordion content 1</p>
                  <p>Accordion content 2</p>
                </div>
              ),
              badgeProps: { children: "2" },
            },
          ]}
        />
      </Panel>
    </>
  );
}
