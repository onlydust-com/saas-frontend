import { MonitorCheck, ReceiptText } from "lucide-react";
import { useState } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Checkbox } from "@/design-system/atoms/checkbox";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { Alert } from "@/design-system/molecules/alert";
import { RadioButtonGroup } from "@/design-system/molecules/radio-button-group";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { useRequestPaymentFlow } from "@/shared/panels/_flows/request-payment-flow/request-payment-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { useInvoicingMandate } from "../invoicing-mandate/invoicing-mandate.hooks";
import { useAcceptInvoicingMandate } from "./accept-invoicing-mandate.hooks";

// TODO: queries and destructuring components if we can
// TODO: Ajouter avatar-fg en color et le changer partout dans les panels ici
function Content() {
  const [mandateAccepted, setMandateAccepted] = useState(false);

  const { billingProfileId } = useRequestPaymentFlow();
  const { open: openInvoicingMandate } = useInvoicingMandate();

  console.log(billingProfileId);

  function toggleMandateAccepted() {
    setMandateAccepted(!mandateAccepted);
  }

  return (
    <>
      <SidePanelHeader
        title={{
          translate: {
            token: "panels:requestPaymentFlow.title",
          },
        }}
        canGoBack
        canClose
      />

      <SidePanelBody>
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-lg">
            <Paper
              size="lg"
              background="primary-alt"
              border="primary"
              classNames={{
                base: "flex justify-between gap-xl",
              }}
            >
              <div className="flex gap-lg">
                <Avatar
                  shape="squared"
                  size="lg"
                  iconProps={{
                    component: MonitorCheck,
                  }}
                />

                <div className="flex max-w-xs flex-col gap-xs">
                  <Typo
                    size="sm"
                    weight="medium"
                    translate={{
                      token: "panels:acceptInvoicingMandate.choices.automatic.title",
                    }}
                  />

                  <Typo
                    size="xs"
                    color="secondary"
                    translate={{
                      token: "panels:acceptInvoicingMandate.choices.automatic.description",
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-lg">
                <Badge
                  color="brand"
                  size="xs"
                  translate={{
                    token: "panels:acceptInvoicingMandate.choices.tags.recommended",
                  }}
                />

                <RadioButtonGroup items={[{ label: "test", value: "test" }]} value={"test"} />
              </div>
            </Paper>

            <Paper
              size="lg"
              background="primary-alt"
              border="primary"
              classNames={{
                base: "flex justify-between gap-xl",
              }}
            >
              <div className="flex gap-lg">
                <Avatar
                  shape="squared"
                  size="lg"
                  iconProps={{
                    component: ReceiptText,
                  }}
                />

                <div className="flex max-w-xs flex-col gap-xs">
                  <Typo
                    size="sm"
                    weight="medium"
                    translate={{
                      token: "panels:acceptInvoicingMandate.choices.manual.title",
                    }}
                  />

                  <Typo
                    size="xs"
                    color="secondary"
                    translate={{
                      token: "panels:acceptInvoicingMandate.choices.manual.description",
                    }}
                  />
                </div>
              </div>
            </Paper>
          </div>

          <Alert
            color="brand"
            title={<Translate token="panels:acceptInvoicingMandate.alert.title" />}
            description={<Translate token="panels:acceptInvoicingMandate.alert.description" />}
            classNames={{
              description: "whitespace-pre-line",
            }}
          />
        </div>
      </SidePanelBody>

      <SidePanelFooter>
        <div className="flex w-full items-center justify-between gap-lg">
          <Button
            size="md"
            variant="secondary"
            onClick={toggleMandateAccepted}
            startContent={<Checkbox value={mandateAccepted} onChange={toggleMandateAccepted} />}
          >
            <Translate token="panels:acceptInvoicingMandate.footer.accept" />{" "}
            <span
              className="underline"
              onClick={e => {
                e.stopPropagation();
                openInvoicingMandate();
              }}
            >
              <Translate token="panels:acceptInvoicingMandate.footer.mandate" />
            </span>
          </Button>

          <Button size="md" isDisabled={!mandateAccepted}>
            <Translate token="common:next" />
          </Button>
        </div>
      </SidePanelFooter>
    </>
  );
}

export function AcceptInvoicingMandate() {
  const { name } = useAcceptInvoicingMandate();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <Content />
    </Panel>
  );
}
