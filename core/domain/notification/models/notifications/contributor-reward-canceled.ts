import { Notification } from "@/core/domain/notification/models/notification-model";
import { NotificationInterface } from "@/core/domain/notification/models/notification.types";
import { NotificationStatus } from "@/core/domain/notification/notification-constants";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { MARKETPLACE_ROUTER } from "@/shared/constants/router";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";

export class ContributorRewardCanceled implements NotificationInterface {
  data: components["schemas"]["NotificationContributorRewardCanceled"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.contributorRewardCanceled;
  }

  getId() {
    return this.notification.id;
  }

  getTimestamp() {
    return this.notification.timestamp;
  }

  getStatus() {
    return this.notification.status;
  }

  hasRead() {
    return this.notification.status === NotificationStatus.READ;
  }

  getTitle() {
    return "Your reward has been canceled";
  }

  getDescription() {
    const { projectName, currencyCode, amount } = this.data || {};
    return `Your reward of ${amount} ${currencyCode} has been canceled for the project ${projectName}.`;
  }

  getUrl() {
    return marketplaceRouting(MARKETPLACE_ROUTER.rewards.all);
  }
}
