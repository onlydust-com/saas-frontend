import { Info } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { Typo } from "@/design-system/atoms/typo";
import { Alert } from "@/design-system/molecules/alert";

import { useInvoicePreview } from "@/shared/features/invoice/hooks/use-invoice-preview/use-invoice-preview";
import { useInvoiceUpload } from "@/shared/features/invoice/hooks/use-invoice-upload/use-invoice-upload";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { UploadFile } from "@/shared/panels/_flows/request-payment-flow/_panels/_components/upload-file/upload-file";
import { UploadedFileDisplay } from "@/shared/panels/_flows/request-payment-flow/_panels/_components/uploaded-file-display/uploaded-file-display";
import { useUploadInvoice } from "@/shared/panels/_flows/request-payment-flow/_panels/upload-invoice/upload-invoice.hooks";
import { useRequestPaymentFlow } from "@/shared/panels/_flows/request-payment-flow/request-payment-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

function Content() {
  const [selectedFileBlob, setSelectedFileBlob] = useState<File>();
  const { t } = useTranslation();
  const { billingProfileId = "", rewardIds } = useRequestPaymentFlow();

  const {
    isLoading: isLoadingInvoicePreview,
    isError,
    fileUrl,
    invoiceId,
  } = useInvoicePreview({
    rewardIds,
    billingProfileId,
    isSample: true,
  });

  const { isPendingUploadInvoice, handleSendInvoice } = useInvoiceUpload({
    billingProfileId,
    invoiceId,
  });

  function removeFile() {
    setSelectedFileBlob(undefined);
  }

  const requirementList = useMemo(
    () => (
      <ul>
        {Array.from({ length: 5 }, (_, index) => {
          const token = `panels:uploadInvoice.summary.rule_${index + 1}`;
          return <li key={token}>{t(token)}</li>;
        })}
      </ul>
    ),
    []
  );

  const renderUploadSample = useMemo(() => {
    if (isLoadingInvoicePreview) {
      return (
        <div className="flex flex-col gap-2">
          <Skeleton classNames={{ base: "h-2" }} />
          <Skeleton classNames={{ base: "h-1" }} />
          <Skeleton classNames={{ base: "h-1" }} />
        </div>
      );
    }
    if (!isError && !isLoadingInvoicePreview) {
      return (
        <>
          <Typo weight="medium" translate={{ token: "panels:uploadInvoice.sample_to_download" }} />
          <a className="text-snow hover:text-text-2 active:text-text-2" href={fileUrl} download="invoice-sample.pdf">
            <Typo weight="medium" translate={{ token: "panels:uploadInvoice.sample_link_label" }} />
          </a>
        </>
      );
    }
    return null;
  }, [fileUrl, isError, isLoadingInvoicePreview]);

  function renderUploadFile() {
    if (selectedFileBlob) {
      return <UploadedFileDisplay fileName={selectedFileBlob.name} onRemoveFile={removeFile} />;
    }

    return <UploadFile setSelectedFile={setSelectedFileBlob} />;
  }

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
          title={<Translate token="panels:uploadInvoice.alert.title" />}
          description={<Translate token="panels:uploadInvoice.alert.description" />}
          icon={{ component: Info }}
        />
        <Paper background={"primary-alt"}>
          <div className="text-greyscale-50 prose leading-normal">
            <Translate token="panels:uploadInvoice.summary.requirement" />
            <br />
            {requirementList}
            {renderUploadSample}
          </div>
        </Paper>
        <Typo color="primary" translate={{ token: "panels:uploadInvoice.uploadInvoiceTitle" }} />
        {renderUploadFile()}
      </SidePanelBody>
      <SidePanelFooter>
        {selectedFileBlob ? (
          <Alert
            color="grey"
            title={<Translate token="panels:uploadInvoice.submission.alert.title" />}
            description={<Translate token="panels:uploadInvoice.submission.alert.description" />}
            icon={{ component: Info }}
          />
        ) : null}
        <Button
          variant={"secondary"}
          size={"md"}
          onClick={() =>
            handleSendInvoice({
              fileBlob: selectedFileBlob as Blob,
              isManualUpload: true,
              fileName: selectedFileBlob?.name,
            })
          }
          isDisabled={!selectedFileBlob}
          isLoading={isPendingUploadInvoice}
          translate={{ token: "common:form.send" }}
        />
      </SidePanelFooter>
    </>
  );
}

export function UploadInvoice() {
  const { name } = useUploadInvoice();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <Content />
    </Panel>
  );
}
