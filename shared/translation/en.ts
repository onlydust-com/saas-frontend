import { enProgramsTranslation } from "@/app/programs/_translations/programs.translate";

import { enDateRangePickerTranslation } from "@/design-system/atoms/date-range-picker/translations/date-range-picker.translate";
import { enCardTransactionTranslation } from "@/design-system/molecules/cards/card-transaction/translations/card-transaction.translate";
import { enTableColumnListTranslation } from "@/design-system/molecules/table-column-list/translations/table-column-list.translate";
import { enTableFilterTranslation } from "@/design-system/molecules/table-filter/translations/table-filter.translate";
import { enTableGroupByTranslation } from "@/design-system/molecules/table-group-by/translations/table-group-by.translate";
import { enTableSortTranslation } from "@/design-system/molecules/table-sort/translations/table-sort.translate";
import { enTableNavTranslation } from "@/design-system/organisms/table-nav/translations/table-nav.translate";

import { enFeedbackDrawerTranslate } from "@/shared/features/feedback-drawer/_translations/feedback-drawer.translate";
import { enPrimaryNavigationTranslation } from "@/shared/features/navigation/primary-navigation/_translations/primary-navigation.translate";
import { enPanelsTranslation } from "@/shared/panels/_translations/panels.translate";
import common from "@/shared/translation/translations/common/common.en.json";
import error from "@/shared/translation/translations/error/error.en.json";
import notFound from "@/shared/translation/translations/not-found/not-found.en.json";

export const en = {
  common,
  notFound,
  error,
  ...enPrimaryNavigationTranslation,
  ...enFeedbackDrawerTranslate,
  ...enProgramsTranslation,
  ...enDateRangePickerTranslation,
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
  ...enPanelsTranslation,
};
