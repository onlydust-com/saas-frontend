import { Alert } from "@/design-system/molecules/alert";

import { FeedbackDrawer } from "@/shared/features/feedback-drawer/feedback-drawer";
import { useFeedbackDrawerState } from "@/shared/features/feedback-drawer/feedback-drawer.hooks";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { useCurrencyListSidepanel } from "@/shared/panels/currency-list-sidepanel/currency-list-sidepanel.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

export function CurrencyListSidepanel() {
  const { name } = useCurrencyListSidepanel();
  const { Panel } = useSidePanel({ name });

  const feedbackDrawerState = useFeedbackDrawerState();
  const [, setIsOpen] = feedbackDrawerState;

  function handleOpenFeedbackDrawer() {
    setIsOpen(true);
  }

  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: { token: "panels:currencyList.title" },
        }}
        canClose
      />

      <SidePanelBody>
        <div className="flex-1">Currencies</div>

        <Alert
          title={<Translate token={"panels:currencyList.alert.title"} />}
          description={<Translate token={"panels:currencyList.alert.description"} />}
          color={"brand"}
          primaryButton={{
            translate: { token: "panels:currencyList.alert.primaryAction" },
            onClick: handleOpenFeedbackDrawer,
          }}
        />
      </SidePanelBody>
      <FeedbackDrawer state={feedbackDrawerState} />
    </Panel>
  );
}
