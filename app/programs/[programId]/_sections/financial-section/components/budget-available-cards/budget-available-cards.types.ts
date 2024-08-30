import { ProgramInterface } from "@/core/domain/program/models/program-model";
import { AnyType } from "@/core/kernel/types";

import { CardFinancialPort } from "@/design-system/molecules/cards/card-financial/card-financial.types";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export interface CreateAvatarGroupProps {
  total: ProgramInterface["totalAvailable" | "totalGranted" | "totalRewarded"];
}

export interface FinancialCardItemProps {
  title: TranslateProps["token"];
  total: ProgramInterface["totalAvailable" | "totalGranted" | "totalRewarded"];
  color: CardFinancialPort<AnyType>["color"];
  onClick?: () => void;
}
