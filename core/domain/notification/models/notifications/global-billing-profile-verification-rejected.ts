import { Notification } from "@/core/domain/notification/models/notification-model";
import { NotificationInterface } from "@/core/domain/notification/models/notification.types";
import { NotificationStatus } from "@/core/domain/notification/notification-constants";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { MARKETPLACE_ROUTER } from "@/shared/constants/router";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";

export class GlobalBillingProfileVerificationRejected implements NotificationInterface {
  data: components["schemas"]["NotificationGlobalBillingProfileVerificationRejected"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.globalBillingProfileVerificationRejected;
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
    return "Your billing profile has been rejected";
  }

  getDescription() {
    const { billingProfileName, reason } = this.data || {};
    return `Your billing profile ${billingProfileName} has been rejected because of: ${reason}.`;
  }

  getUrl() {
    const { billingProfileId } = this.data || {};
    if (billingProfileId) {
      return marketplaceRouting(MARKETPLACE_ROUTER.settings.billing.generalInformation(billingProfileId));
    }
    return undefined;
  }
}
