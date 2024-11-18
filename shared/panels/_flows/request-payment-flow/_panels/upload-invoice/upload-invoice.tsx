import { Download, Info } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Skeleton } from "@/design-system/atoms/skeleton";
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

  const renderGuidelineAll = useMemo(
    () => (
      <>
        <Typo size="xs" color="secondary" translate={{ token: "panels:uploadInvoice.guidelineAll.subtitle" }} />
        <Typo size="xs" color="secondary">
          <ul>
            {Array.from({ length: 3 }, (_, index) => {
              const token = `panels:uploadInvoice.guidelineAll.rule_${index + 1}`;
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
        <Typo size="xs" color="secondary" translate={{ token: "panels:uploadInvoice.guidelineSender.subtitle" }} />
        <Typo size="xs" color="secondary">
          <ul>
            {Array.from({ length: 2 }, (_, index) => {
              const token = `panels:uploadInvoice.guidelineSender.rule_${index + 1}`;
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
        <Typo size="xs" color="secondary" translate={{ token: "panels:uploadInvoice.guidelineRecipient.subtitle" }} />
        <Typo size="xs" color="secondary">
          <ul>
            {Array.from({ length: 2 }, (_, index) => {
              const token = `panels:uploadInvoice.guidelineRecipient.rule_${index + 1}`;
              return <li key={token}>{t(token)}</li>;
            })}
          </ul>
        </Typo>
      </>
    ),
    []
  );

  const renderUploadSample = useMemo(() => {
    if (isLoadingInvoicePreview) {
      return (
        <div className="flex flex-col gap-2">
          <Skeleton classNames={{ base: "h-2" }} />
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
        <Paper
          background={"primary-alt"}
          border={"primary"}
          classNames={{ base: "prose leading-normal flex flex-col gap-lg" }}
        >
          <Typo as={"div"} size="sm" weight="medium" translate={{ token: "panels:uploadInvoice.guidelinesTitle" }} />
          <div>
            {renderGuidelineAll}
            {renderGuidelineSender}
            {renderGuidelineRecipient}
          </div>
          <Typo size="xs" color="secondary" translate={{ token: "panels:uploadInvoice.sample_to_download" }} />
        </Paper>
        {renderUploadFile()}
      </SidePanelBody>
      <SidePanelFooter>
        <div className="flex w-full items-center justify-between">
          {selectedFileBlob ? (
            <Alert
              color="grey"
              title={<Translate token="panels:uploadInvoice.submission.alert.title" />}
              description={<Translate token="panels:uploadInvoice.submission.alert.description" />}
              icon={{ component: Info }}
            />
          ) : null}
          <a
            className="flex cursor-pointer items-center gap-md rounded-md border border-border-primary px-lg py-md effect-box-shadow-xs"
            href={fileUrl}
            download="invoice-sample.pdf"
          >
            {isLoadingInvoicePreview ? <Spinner /> : <Icon component={Download} size="sm" />}
            <Typo size="sm" color="secondary" translate={{ token: "panels:uploadInvoice.sample_link_label" }} />
          </a>
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
