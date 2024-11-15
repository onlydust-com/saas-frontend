import { MonitorCheck, ReceiptText } from "lucide-react";
import { PropsWithChildren, ReactNode } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { IconPort } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { RadioGroup } from "@/design-system/atoms/radio-group";
import { Typo } from "@/design-system/atoms/typo";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

import { UploadSelection } from "../../accept-invoicing-mandate/accept-invoicing-mandate.types";
import { InvoiceUploadSelectionProps } from "./invoice-upload-selection.types";

function CustomRadioComponent({ type, children }: { type: UploadSelection } & PropsWithChildren): ReactNode {
  const content: {
    [key in UploadSelection]: {
      title: TranslateProps;
      description: TranslateProps;
      iconProps: IconPort;
      isRecommended: boolean;
    };
  } = {
    GENERATE: {
      title: {
        token: "panels:requestPaymentFlow.choices.generate.title",
      },
      description: {
        token: "panels:requestPaymentFlow.choices.generate.description",
      },
      iconProps: {
        component: MonitorCheck,
      },
      isRecommended: true,
    },
    MANUAL: {
      title: {
        token: "panels:requestPaymentFlow.choices.manual.title",
      },
      description: {
        token: "panels:requestPaymentFlow.choices.manual.description",
      },
      iconProps: {
        component: ReceiptText,
      },
      isRecommended: false,
    },
  };

  const { title, description, iconProps, isRecommended } = content[type];

  return (
    <Paper
      size="lg"
      background="primary-alt"
      border="primary"
      classNames={{
        base: "flex justify-between gap-xl",
      }}
    >
      <div className="flex gap-lg">
        <Avatar shape="squared" size="lg" iconProps={iconProps} />

        <div className="flex max-w-xs flex-col gap-xs">
          <Typo size="sm" weight="medium" translate={title} />

          <Typo size="xs" color="secondary" translate={description} />
        </div>
      </div>

      <div className="flex items-center gap-lg">
        {isRecommended ? (
          <Badge
            color="brand"
            size="xs"
            translate={{
              token: "panels:requestPaymentFlow.choices.tags.recommended",
            }}
          />
        ) : null}

        {children}
      </div>
    </Paper>
  );
}

export function InvoiceUploadSelection({ value, onChange }: InvoiceUploadSelectionProps) {
  return (
    <RadioGroup
      as={CustomRadioComponent}
      value={value}
      onChange={onChange}
      items={[
        { value: "GENERATE", componentProps: { type: "GENERATE" } },
        { value: "MANUAL", componentProps: { type: "MANUAL" } },
      ]}
      classNames={{
        base: "gap-lg",
        item: "w-full",
      }}
    />
  );
}
