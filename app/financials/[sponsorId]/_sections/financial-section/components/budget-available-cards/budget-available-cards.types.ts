import { SponsorInterface } from "@/core/domain/sponsor/models/sponsor-model";
import { AnyType } from "@/core/kernel/types";

import { CardFinancialPort } from "@/design-system/molecules/cards/card-financial/card-financial.types";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

export interface CreateAvatarGroupProps {
  total: SponsorInterface["totalDeposited" | "totalAvailable" | "totalGranted" | "totalRewarded"];
}

export interface FinancialCardItemProps {
  title: TranslateProps["token"];
  total: SponsorInterface["totalDeposited" | "totalAvailable" | "totalGranted" | "totalRewarded"];
  color: CardFinancialPort<AnyType>["color"];
  onClick?: () => void;
}
