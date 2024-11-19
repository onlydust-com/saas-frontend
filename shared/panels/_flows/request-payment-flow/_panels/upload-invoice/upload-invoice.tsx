import { Download, Info } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Spinner } from "@/design-system/atoms/spinner";
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
    fileUrl,
    invoiceId,
  } = useInvoicePreview({
    rewardIds,
    billingProfileId,
    isSample: true,
  });

  const { isPendingUploadInvoice, handleSetFileName, handleSendManualInvoice } = useInvoiceUpload({
    billingProfileId,
    invoiceId,
  });

  function removeFile() {
    setSelectedFileBlob(undefined);
  }

  const renderGuidelineAll = useMemo(
    () => (
      <>
        <Typo
          size="xs"
          color="secondary"
          translate={{ token: "panels:requestPaymentFlow.upload.guidelineAll.subtitle" }}
        />
        <Typo size="xs" color="secondary">
          <ul>
            {Array.from({ length: 3 }, (_, index) => {
              const token = `panels:requestPaymentFlow.upload.guidelineAll.rule_${index + 1}`;
              return <li key={token}>{t(token)}</li>;
            })}
          </ul>
        </Typo>
      </>
    ),
    []
  );

  const renderGuidelineSender = useMemo(
    () => (
      <>
        <Typo
          size="xs"
          color="secondary"
          translate={{ token: "panels:requestPaymentFlow.upload.guidelineSender.subtitle" }}
        />
        <Typo size="xs" color="secondary">
          <ul>
            {Array.from({ length: 2 }, (_, index) => {
              const token = `panels:requestPaymentFlow.upload.guidelineSender.rule_${index + 1}`;
              return <li key={token}>{t(token)}</li>;
            })}
          </ul>
        </Typo>
      </>
    ),
    []
  );

  const renderGuidelineRecipient = useMemo(
    () => (
      <>
        <Typo
          size="xs"
          color="secondary"
          translate={{ token: "panels:requestPaymentFlow.upload.guidelineRecipient.subtitle" }}
        />
        <Typo size="xs" color="secondary">
          <ul>
            {Array.from({ length: 2 }, (_, index) => {
              const token = `panels:requestPaymentFlow.upload.guidelineRecipient.rule_${index + 1}`;
              return <li key={token}>{t(token)}</li>;
            })}
          </ul>
        </Typo>
      </>
    ),
    []
  );

  function handleSetSelectedFile(file: File) {
    setSelectedFileBlob(file);
    handleSetFileName(file.name);
  }

  function renderUploadFile() {
    if (selectedFileBlob) {
      return <UploadedFileDisplay fileName={selectedFileBlob.name} onRemoveFile={removeFile} />;
    }

    return <UploadFile setSelectedFile={handleSetSelectedFile} />;
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
        <Alert
          color="grey"
          title={<Translate token="panels:requestPaymentFlow.upload.alert.title" />}
          description={<Translate token="panels:requestPaymentFlow.upload.alert.description" />}
          icon={{ component: Info }}
        />
        <Paper
          background={"primary-alt"}
          border={"primary"}
          classNames={{ base: "prose leading-normal flex flex-col gap-lg" }}
        >
          <Typo
            as={"div"}
            size="sm"
            weight="medium"
            translate={{ token: "panels:requestPaymentFlow.upload.guidelinesTitle" }}
          />
          <div>
            {renderGuidelineAll}
            {renderGuidelineSender}
            {renderGuidelineRecipient}
          </div>
          <Typo
            size="xs"
            color="secondary"
            translate={{ token: "panels:requestPaymentFlow.upload.sample_to_download" }}
          />
        </Paper>
        {renderUploadFile()}
      </SidePanelBody>
      <SidePanelFooter>
        <div className="flex w-full items-center justify-between">
          {isLoadingInvoicePreview ? <Spinner /> : null}
          {fileUrl ? (
            <a
              className="flex cursor-pointer items-center gap-md rounded-md border border-border-primary px-lg py-md effect-box-shadow-xs"
              href={fileUrl}
              download="invoice-sample.pdf"
            >
              <Icon component={Download} size="sm" />
              <Typo
                size="sm"
                color="secondary"
                translate={{ token: "panels:requestPaymentFlow.upload.sample_link_label" }}
              />
            </a>
          ) : (
            <div />
          )}
          <Button
            size={"md"}
            onClick={() => handleSendManualInvoice(selectedFileBlob as Blob)}
            isDisabled={!selectedFileBlob}
            isLoading={isPendingUploadInvoice}
            translate={{ token: "common:form.send" }}
          />
        </div>
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
