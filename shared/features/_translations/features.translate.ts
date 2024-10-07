import enActivityGraphTranslate from "@/shared/features/activity-graph/activity-graph-translate.en.json";
import enAmountSelector from "@/shared/features/amount-selector/_translations/amount-selector.en.json";
import enCardContributionKanban from "@/shared/features/card-contribution-kanban/card-contribution-kanban-translate.en.json";
import { enFiltersTranslations } from "@/shared/features/filters/_translations/filters.translate";
import enNotifications from "@/shared/features/notifications/_translations/notifications.en.json";
import { enPopoversTranslations } from "@/shared/features/popovers/_translations/popovers.translate";
import enSocialLinkTranslate from "@/shared/features/social-link/social-translate/social-translate.en.json";

export const enFeaturesTranslations = {
  features: {
    amountSelector: enAmountSelector,
    notifications: enNotifications,
    socialLink: enSocialLinkTranslate,
    activityGraph: enActivityGraphTranslate,
    cardContributionKanban: enCardContributionKanban,
    ...enFiltersTranslations,
    ...enPopoversTranslations,
  },
};
