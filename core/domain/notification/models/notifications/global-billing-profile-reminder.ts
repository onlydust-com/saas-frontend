import { Notification } from "@/core/domain/notification/models/notification-model";
import { NotificationInterface } from "@/core/domain/notification/models/notification.types";
import { NotificationStatus } from "@/core/domain/notification/notification-constants";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { NEXT_ROUTER } from "@/shared/constants/router";

export class GlobalBillingProfileReminder implements NotificationInterface {
  data: components["schemas"]["NotificationGlobalBillingProfileReminder"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.globalBillingProfileReminder;
  }

  getType() {
    return this.notification.type;
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
    return "Your billing profile is incomplete";
  }

  getDescription() {
    const { billingProfileName } = this.data || {};
    return `Your billing profile ${billingProfileName} is incomplete, please update it to complete the process.`;
  }

  getUrl() {
    const { billingProfileId } = this.data || {};
    if (billingProfileId) {
      return NEXT_ROUTER.settings.billingProfiles.generalInformation.root(billingProfileId);
    }
    return undefined;
  }
}
