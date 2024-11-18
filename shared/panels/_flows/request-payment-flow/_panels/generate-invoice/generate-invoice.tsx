import { Info } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Alert } from "@/design-system/molecules/alert";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { useInvoicePreview } from "@/shared/features/invoice/hooks/use-invoice-preview/use-invoice-preview";
import { useInvoiceUpload } from "@/shared/features/invoice/hooks/use-invoice-upload/use-invoice-upload";
import InvoiceViewer from "@/shared/features/invoice/viewer/invoice-viewer";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { useGenerateInvoice } from "@/shared/panels/_flows/request-payment-flow/_panels/generate-invoice/generate-invoice.hooks";
import { useRequestPaymentFlow } from "@/shared/panels/_flows/request-payment-flow/request-payment-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

function Content() {
  const { billingProfileId = "", rewardIds } = useRequestPaymentFlow();

  const {
    isLoading: isLoadingInvoicePreview,
    isError,
    fileBlob,
    fileUrl,
    invoiceId,
  } = useInvoicePreview({
    rewardIds,
    billingProfileId,
    isSample: false,
  });

  const { isPendingUploadInvoice, handleSendInvoice } = useInvoiceUpload({
    billingProfileId,
    invoiceId,
  });

  const renderInvoicePreview = useMemo(() => {
    if (isLoadingInvoicePreview) {
      return (
        <div className={"grid gap-md"}>
          <Skeleton classNames={{ base: "h-16" }} />
          <Skeleton classNames={{ base: "h-16" }} />
          <Skeleton classNames={{ base: "h-16" }} />
          <Skeleton classNames={{ base: "h-16" }} />
        </div>
      );
    }
    if (isError) {
      return <ErrorState />;
    }
    if (fileUrl) {
      return (
        <Paper border={"primary"} classNames={{ base: "overflow-hidden" }}>
          <ScrollView>
            <div className="flex flex-col gap-lg">
              <InvoiceViewer fileUrl={fileUrl} />
            </div>
          </ScrollView>
        </Paper>
      );
    }
    return null;
  }, [isLoadingInvoicePreview, isError, fileUrl]);

  return (
    <>
      <SidePanelHeader
        title={{
          translate: {
            // TODO update title
            token: "panels:singleContributionSelection.title",
          },
        }}
        canClose
      />

      <SidePanelBody>
        <Alert
          color="grey"
          title={<Translate token="panels:requestPaymentFlow.generate.alert.title" />}
          description={<Translate token="panels:requestPaymentFlow.generate.alert.description" />}
          icon={{ component: Info }}
        />
        {renderInvoicePreview}
      </SidePanelBody>
      <SidePanelFooter>
        <Button
          variant={"secondary"}
          size={"md"}
          onClick={() => handleSendInvoice({ fileBlob })}
          isDisabled={!fileBlob}
          isLoading={isPendingUploadInvoice}
          translate={{ token: "common:form.send" }}
        />
      </SidePanelFooter>
    </>
  );
}

export function GenerateInvoice() {
  const { name } = useGenerateInvoice();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <Content />
    </Panel>
  );
}
