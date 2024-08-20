import { useGrantFormContext } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.context";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { CardProject } from "@/design-system/molecules/cards/card-project";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { Translate } from "@/shared/translation/components/translate/translate";

export function GrantFormSidepanel() {
  const { sidePanel, projectState } = useGrantFormContext();
  const { Panel } = sidePanel;
  const [project] = projectState;

  if (!project) return null;

  return (
    <Panel>
      <SidePanelHeader canClose={true} canGoBack title={{ token: "programs:grantForm.title" }} />

      <ScrollView>
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
      </ScrollView>

      <SidePanelFooter>
        <Button size={"l"} classNames={{ base: "w-full" }}>
          <Translate token={"programs:grantForm.submit"} />
        </Button>
      </SidePanelFooter>
    </Panel>
  );
}
