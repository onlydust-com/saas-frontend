import { ProgramInterface } from "@/core/domain/program/models/program-model";
import { SponsorInterface } from "@/core/domain/sponsor/models/sponsor-model";
import { AnyType } from "@/core/kernel/types";

import { CardFinancialPort } from "@/design-system/molecules/cards/card-financial";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

type Total =
  | SponsorInterface["totalDeposited" | "totalAvailable" | "totalGranted" | "totalRewarded"]
  | ProgramInterface["totalAvailable" | "totalGranted" | "totalRewarded"];

export interface CreateAvatarGroupProps {
  total: Total;
}

export interface FinancialCardItemProps {
  title: TranslateProps["token"];
  total: Total;
  color: CardFinancialPort<AnyType>["color"];
  onClick?: () => void;
}
