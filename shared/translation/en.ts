import { enDataTranslation } from "@/app/(saas)/data/_translations/data.translate";
import { enEcosystemsTranslation } from "@/app/(saas)/ecosystems/_translations/ecosystems.translate";
import { enExploreTranslation } from "@/app/(saas)/explore/_translations/explore.translate";
import { enFinancialsTranslation } from "@/app/(saas)/financials/_translations/financials.translate";
import { enHackathonsTranslation } from "@/app/(saas)/hackathons/_translations/hackathons.translate";
import { enManageProjectsTranslation } from "@/app/(saas)/manage-projects/_translations/manage-projects.translate";
import { enMyDashboardTranslation } from "@/app/(saas)/my-dashboard/_translations/my-dashboard.translate";
import { enProgramsTranslation } from "@/app/(saas)/programs/_translations/programs.translate";
import { enProjectRecommendationTranslation } from "@/app/(saas)/project-recommendation/_translations/project-recommendation.translate";
import { enSplashTranslation } from "@/app/(splash)/_translations/splash.translate";
import { enProjectsTranslation } from "@/app/projects/_translations/projects.translate";
import { enRepositoriesTranslation } from "@/app/repositories/_translations/repositories.translate";
import { enUsersTranslation } from "@/app/users/_translations/users.translate";

import { enDateRangePickerTranslation } from "@/design-system/atoms/date-range-picker/translations/date-range-picker.translate";
import { enCardTranslations } from "@/design-system/molecules/cards/_translations/cards.translate";
import { enItemNavTranslation } from "@/design-system/molecules/item-nav/_translations/item-nav.translate";
import { enTableFilterTranslation } from "@/design-system/molecules/table-filter/translations/table-filter.translate";
import { enTableGroupByTranslation } from "@/design-system/molecules/table-group-by/translations/table-group-by.translate";
import { enTableSearchTranslation } from "@/design-system/molecules/table-search/translations/table-search.translate";
import { enTableNavTranslation } from "@/design-system/organisms/table-nav/translations/table-nav.translate";

import { enComponentsTranslations } from "@/shared/components/_translations/components.translate";
import { enMutationTranslations } from "@/shared/components/mutation/_translations/mutation.translate";
import { enFeaturesTranslations } from "@/shared/features/_translations/features.translate";
import { enFeedbackDrawerTranslate } from "@/shared/features/feedback-drawer/_translations/feedback-drawer.translate";
import { enPrimaryNavigationTranslation } from "@/shared/features/navigation/_translations/primary-navigation.translate";
import { enModalsTranslation } from "@/shared/modals/_translations/modals.translate";
import { enPanelsTranslation } from "@/shared/panels/_translations/panels.translate";
import common from "@/shared/translation/translations/common/common.en.json";
import error from "@/shared/translation/translations/error/error.en.json";
import notFound from "@/shared/translation/translations/not-found/not-found.en.json";
import enProjectTagsTranslation from "@/shared/translation/translations/projects/project-tags.en.json";
import stories from "@/shared/translation/translations/stories/stories.en.json";

export const en = {
  common,
  notFound,
  error,
  stories,
  ...enPrimaryNavigationTranslation,
  ...enFeedbackDrawerTranslate,
  ...enProgramsTranslation,
  ...enProjectRecommendationTranslation,
  ...enFinancialsTranslation,
  ...enDataTranslation,
  ...enProjectsTranslation,
  ...enHackathonsTranslation,
  ...enRepositoriesTranslation,
  ...enEcosystemsTranslation,
  ...enUsersTranslation,
  ...enManageProjectsTranslation,
  ...enMyDashboardTranslation,
  ...enExploreTranslation,
  ...enDateRangePickerTranslation,
  ...enCardTranslations,
  ds: {
    ...enItemNavTranslation,
  },
  table: {
    ...enTableFilterTranslation,
    ...enTableGroupByTranslation,
    ...enTableNavTranslation,
    ...enTableSearchTranslation,
  },
  ...enFeaturesTranslations,
  ...enComponentsTranslations,
  ...enPanelsTranslation,
  ...enSplashTranslation,
  ...enModalsTranslation,
  ...enMutationTranslations,
  projects: {
    ...enProjectTagsTranslation,
  },
};
