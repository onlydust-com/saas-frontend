import { enProgramsTranslation } from "@/app/programs/_translations/programs.translate";
import { enTestTranslation } from "@/app/test/_translations/test.translate";

import { enCardTransactionTranslation } from "@/design-system/molecules/cards/card-transaction/translations/card-transaction.translate";
import { enTableFilterTranslation } from "@/design-system/molecules/table-filter/translations/table-filter.translate";

import { enFeedbackDrawerTranslate } from "@/shared/features/feedback-drawer/_translations/feedback-drawer.translate";
import { enPrimaryNavigationTranslation } from "@/shared/features/navigation/primary-navigation/_translations/primary-navigation.translate";
import common from "@/shared/translation/translations/common/common.en.json";

export const en = {
  common,
  ...enTestTranslation,
  ...enPrimaryNavigationTranslation,
  ...enFeedbackDrawerTranslate,
  ...enProgramsTranslation,
  ...enTableFilterTranslation,
  cards: {
    ...enCardTransactionTranslation,
  },
};
