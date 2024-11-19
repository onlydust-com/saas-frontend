import { CloudUpload } from "lucide-react";
import { ChangeEvent, useRef } from "react";

import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { toast } from "@/design-system/molecules/toaster";

import { UploadFileProps } from "@/shared/panels/_flows/request-payment-flow/_panels/_components/upload-file/upload-file.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function UploadFile({ setSelectedFile }: UploadFileProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleOnChange(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.files) {
      if (event.target.files[0].size > 3000000) {
        toast.error(<Translate token={"panels:requestPaymentFlow.upload.errorMaxSizeFile"} />);
      } else {
        setSelectedFile(event.target.files[0]);
      }
    }
  }

  return (
    <Paper
      classNames={{
        base: "relative z-[0] flex flex-col items-center gap-lg border-border-primary border border-dashed !py-10",
      }}
    >
      <Icon component={CloudUpload} />
      <div className="flex flex-col gap-1 text-center">
        <Typo color="brand-secondary-alt" translate={{ token: "panels:requestPaymentFlow.upload.clickToUpload" }} />
        <Typo size="sm" color="secondary" translate={{ token: "panels:requestPaymentFlow.upload.fileType" }} />
      </div>
      <input
        type="file"
        ref={inputRef}
        onChange={handleOnChange}
        className="absolute h-full w-full cursor-pointer opacity-0"
        accept="application/pdf"
      />
    </Paper>
  );
}
