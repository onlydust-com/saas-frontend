import { Notification } from "@/core/domain/notification/models/notification-model";
import { NotificationInterface } from "@/core/domain/notification/models/notification.types";
import { NotificationStatus } from "@/core/domain/notification/notification-constants";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { MARKETPLACE_ROUTER } from "@/shared/constants/router";

export class GlobalBillingProfileVerificationClosed implements NotificationInterface {
  data: components["schemas"]["NotificationGlobalBillingProfileVerificationClosed"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.globalBillingProfileVerificationClosed;
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
    return "Your billing profile has been closed";
  }

  getDescription() {
    const { billingProfileName } = this.data || {};
    return `Your billing profile ${billingProfileName} has been closed, please contact support for more information`;
  }

  getUrl() {
    const { billingProfileId } = this.data || {};
    if (billingProfileId) {
      return this.notification.createMarketplaceUrl(
        MARKETPLACE_ROUTER.settings.billing.generalInformation(billingProfileId)
      );
    }
    return undefined;
  }
}
