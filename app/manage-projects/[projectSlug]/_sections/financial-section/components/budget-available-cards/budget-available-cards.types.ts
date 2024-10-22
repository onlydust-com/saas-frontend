import { ProjectFinancial } from "@/core/domain/project/models/project-financial-model";
import { AnyType } from "@/core/kernel/types";

import { CardFinancialPort } from "@/design-system/molecules/cards/card-financial/card-financial.types";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export interface CreateAvatarGroupProps {
  total: ProjectFinancial["totalAvailable" | "totalGranted" | "totalRewarded"];
}

export interface FinancialCardItemProps {
  title: TranslateProps["token"];
  total: ProjectFinancial["totalAvailable" | "totalGranted" | "totalRewarded"];
  color: CardFinancialPort<AnyType>["color"];
  onClick?: () => void;
}
