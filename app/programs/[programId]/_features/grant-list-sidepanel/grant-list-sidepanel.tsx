import { ChevronRight, Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "react-use";

import { AllProjects } from "@/app/programs/[programId]/_features/grant-list-sidepanel/all-projects";
import { AllProjectsBadge } from "@/app/programs/[programId]/_features/grant-list-sidepanel/all-projects-badge";
import { AlreadyGrantedBadge } from "@/app/programs/[programId]/_features/grant-list-sidepanel/already-granted-badge";
import { AlreadyGrantedProjects } from "@/app/programs/[programId]/_features/grant-list-sidepanel/already-granted-projects";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Input } from "@/design-system/atoms/input";
import { Accordion } from "@/design-system/molecules/accordion";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { Translate } from "@/shared/translation/components/translate/translate";

export function GrantListSidepanel() {
  const { programId } = useParams<{ programId: string }>();
  const { t } = useTranslation();
  const { Panel, open, close, isOpen } = useSidePanel({ name: "grant-list" });
  const [search, setSearch] = useState<string | undefined>();
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useDebounce(
    () => {
      setDebouncedSearch(search);
    },
    300,
    [search]
  );

  useEffect(() => {
    if (isOpen) {
      setSearch(undefined);
    }
  }, [isOpen]);

  function togglePanel() {
    (isOpen ? close : open)();
  }

  return (
    <>
      <Button variant={"primary"} endIcon={{ component: ChevronRight }} isTextButton size={"md"} onClick={togglePanel}>
        <Translate token={"programs:details.projects.grantProject"} />
      </Button>

      <Panel>
        <SidePanelHeader canClose={true} title={{ translate: { token: "programs:grantList.title" } }} />

        <SidePanelBody>
          <Input
            placeholder={t("programs:grantList.search")}
            startContent={<Icon component={Search} />}
            value={search}
            onChange={e => setSearch(e.currentTarget.value)}
          />

          <Accordion
            items={[
              {
                id: "alreadyGranted",
                titleProps: { translate: { token: "programs:grantList.alreadyGranted" } },
                content: <AlreadyGrantedProjects programId={programId} queryParams={{ search: debouncedSearch }} />,
                badge: {
                  children: <AlreadyGrantedBadge programId={programId} queryParams={{ search: debouncedSearch }} />,
                },
              },
              {
                id: "allProjects",
                titleProps: { translate: { token: "programs:grantList.allProjects" } },
                content: <AllProjects queryParams={{ search: debouncedSearch }} />,
                badge: {
                  children: <AllProjectsBadge queryParams={{ search: debouncedSearch }} />,
                },
              },
            ]}
          />
        </SidePanelBody>
      </Panel>
    </>
  );
}
