import enActivityGraphTranslate from "@/shared/features/activity-graph/activity-graph-translate.en.json";
import enAmountSelector from "@/shared/features/amount-selector/_translations/amount-selector.en.json";
import enCardContributionKanban from "@/shared/features/card-contribution-kanban/card-contribution-kanban-translate.en.json";
import enContributorActivityGraph from "@/shared/features/contributors/activity-graph/contributor-activity-graph-translate.en.json";
import enContributorProfileCheckbox from "@/shared/features/contributors/contributor-profile-checkbox/contributor-profile-checkbox-translate.en.json";
import enContributorProfileExtended from "@/shared/features/contributors/contributor-profile-extended/contributor-profile-extended-translate.en.json";
import { enFiltersTranslations } from "@/shared/features/filters/_translations/filters.translate";
import enNotifications from "@/shared/features/notifications/_translations/notifications.en.json";
import enPayoutStatus from "@/shared/features/payout-status/_translations/payout-status.en.json";
import { enPopoversTranslations } from "@/shared/features/popovers/_translations/popovers.translate";
import enSocialLinkTranslate from "@/shared/features/social-link/social-translate/social-translate.en.json";

export const enFeaturesTranslations = {
  features: {
    amountSelector: enAmountSelector,
    notifications: enNotifications,
    payoutStatus: enPayoutStatus,
    socialLink: enSocialLinkTranslate,
    activityGraph: enActivityGraphTranslate,
    cardContributionKanban: enCardContributionKanban,
    contributorProfileExtended: enContributorProfileExtended,
    contributorProfileCheckbox: enContributorProfileCheckbox,
    contributorActivityGraph: enContributorActivityGraph,
    ...enFiltersTranslations,
    ...enPopoversTranslations,
  },
};
