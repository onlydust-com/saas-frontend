import { FileMinus, Trash2 } from "lucide-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";

import { UploadedFileDisplayProps } from "@/shared/panels/_flows/request-payment-flow/_panels/_components/uploaded-file-display/uploaded-file-display.types";

export function UploadedFileDisplay({ fileName, onRemoveFile }: UploadedFileDisplayProps) {
  return (
    <Paper background="secondary" classNames={{ base: "relative z-[0] flex flex-row items-center gap-4" }}>
      <Icon component={FileMinus} />
      <p className="flex-1">{fileName}</p>
      <Button variant="secondary" onClick={onRemoveFile} isDisabled={!fileName} iconOnly theme="destructive">
        <Icon component={Trash2} size="sm" />
      </Button>
    </Paper>
  );
}
