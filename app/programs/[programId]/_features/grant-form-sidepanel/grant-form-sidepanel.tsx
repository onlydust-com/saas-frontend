import { useRef } from "react";

import { AmountSelector } from "@/app/programs/[programId]/_features/grant-form-sidepanel/_components/amount-selector/amount-selector";
import { Summary } from "@/app/programs/[programId]/_features/grant-form-sidepanel/_components/summary/summary";
import { useGrantFormContext } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.context";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { toast } from "@/design-system/atoms/toaster";
import { CardProject } from "@/design-system/molecules/cards/card-project";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { Translate } from "@/shared/translation/components/translate/translate";

export function GrantFormSidepanel() {
  const { sidePanel, projectState } = useGrantFormContext();
  const { Panel } = sidePanel;
  const [project] = projectState;
  const amountSelectorPortalRef = useRef(null);

  const { mutate } = ProgramReactQueryAdapter.client.useGrantBudgetToProject({
    options: {
      onSuccess: () => {
        toast.success(
          <Translate
            token={"programs:grantForm.success.toast"}
            values={{
              // TODO @hayden
              project: "Bretzel",
              amount: "1000",
              code: "STRK",
            }}
          />
        );
      },
    },
  });

  function handleGrantProject() {
    mutate();
  }

  if (!project) return null;

  return (
    <Panel>
      <SidePanelHeader canClose={true} canGoBack title={{ token: "programs:grantForm.title" }} />

      <div ref={amountSelectorPortalRef} className={"h-full"}>
        <ScrollView>
          <div className="flex h-full flex-col gap-3">
            <CardProject
              title={project.name}
              description={project.description}
              logoUrl={project.logoUrl}
              buttonProps={{
                children: project.grantedAmount,
                classNames: {
                  base: "pointer-events-none whitespace-nowrap",
                },
              }}
            />

            <div className="flex max-h-72 flex-1 items-center">
              <AmountSelector portalRef={amountSelectorPortalRef} />
            </div>

            <Summary />
          </div>
        </ScrollView>
      </div>

      <SidePanelFooter>
        <Button size={"l"} classNames={{ base: "w-full" }} onClick={handleGrantProject}>
          <Translate token={"programs:grantForm.submit"} />
        </Button>
      </SidePanelFooter>
    </Panel>
  );
}
