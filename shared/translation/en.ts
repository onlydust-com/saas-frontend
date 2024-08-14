import { enProgramsTranslation } from "@/app/programs/_translations/programs.translate";
import { enTestTranslation } from "@/app/test/_translations/test.translate";

import { enCardTransactionTranslation } from "@/design-system/molecules/cards/card-transaction/translations/card-transaction.translate";
import { enTableColumnListTranslation } from "@/design-system/molecules/table-column-list/translations/table-column-list.translate";
import { enTableFilterTranslation } from "@/design-system/molecules/table-filter/translations/table-filter.translate";
import { enTableGroupByTranslation } from "@/design-system/molecules/table-group-by/translations/table-group-by.translate";
import { enTableSortTranslation } from "@/design-system/molecules/table-sort/translations/table-sort.translate";
import { enTableNavTranslation } from "@/design-system/organisms/table-nav/translations/table-nav.translate";

import { enFeedbackDrawerTranslate } from "@/shared/features/feedback-drawer/_translations/feedback-drawer.translate";
import { enPrimaryNavigationTranslation } from "@/shared/features/navigation/primary-navigation/_translations/primary-navigation.translate";
import common from "@/shared/translation/translations/common/common.en.json";
import notFound from "@/shared/translation/translations/not-found/not-found.en.json";

export const en = {
  common,
  notFound,
  ...enTestTranslation,
  ...enPrimaryNavigationTranslation,
  ...enFeedbackDrawerTranslate,
  ...enProgramsTranslation,
  cards: {
    ...enCardTransactionTranslation,
  },
  table: {
    ...enTableColumnListTranslation,
    ...enTableFilterTranslation,
    ...enTableGroupByTranslation,
    ...enTableNavTranslation,
    ...enTableSortTranslation,
  },
};
