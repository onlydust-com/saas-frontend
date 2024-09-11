import { Notification } from "@/core/domain/notification/models/notification-model";
import { NotificationInterface } from "@/core/domain/notification/models/notification.types";
import { NotificationStatus } from "@/core/domain/notification/notification-constants";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { NEXT_ROUTER } from "@/shared/constants/router";

export class SponsorLeadDepositApproved implements NotificationInterface {
  data: components["schemas"]["NotificationSponsorLeadDepositApproved"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.sponsorLeadDepositApproved;
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
    return "Deposit approved";
  }

  getDescription() {
    return `Your deposit ${this.data?.currencyCode} ${this.data?.amount} from ${this.data?.timestamp} was approved. Funds are now available for allocations.`;
  }

  getUrl() {
    return this.data?.sponsor.id
      ? NEXT_ROUTER.financials.details.root(this.data.sponsor.id)
      : NEXT_ROUTER.financials.root;
  }
}
