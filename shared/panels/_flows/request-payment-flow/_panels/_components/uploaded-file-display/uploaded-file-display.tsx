import { FileMinus, Trash2 } from "lucide-react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { UploadedFileDisplayProps } from "@/shared/panels/_flows/request-payment-flow/_panels/_components/uploaded-file-display/uploaded-file-display.types";

export function UploadedFileDisplay({ fileName, onRemoveFile }: UploadedFileDisplayProps) {
  return (
    <Paper
      background={"primary-alt"}
      border={"primary"}
      classNames={{ base: "relative z-[0] flex flex-row items-center gap-4" }}
    >
      <Avatar shape="squared" size="lg" iconProps={{ component: FileMinus }} />
      <Typo size="sm" weight="medium" classNames={{ base: "flex-1" }}>
        {fileName}
      </Typo>
      <Button variant="secondary" onClick={onRemoveFile} isDisabled={!fileName} iconOnly theme="destructive">
        <Icon component={Trash2} size="sm" />
      </Button>
    </Paper>
  );
}
