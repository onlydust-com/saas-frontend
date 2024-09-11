import { Notification } from "@/core/domain/notification/models/notification-model";
import { NotificationInterface } from "@/core/domain/notification/models/notification.types";
import { NotificationStatus } from "@/core/domain/notification/notification-constants";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { NEXT_ROUTER } from "@/shared/constants/router";

export class SponsorLeadFundsUnallocatedFromProgram implements NotificationInterface {
  data: components["schemas"]["NotificationSponsorLeadFundsUnallocatedFromProgram"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.programLeadFundsAllocatedToProgram;
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
    // TODO @hayden is this correct ?
    return "Deposit rejected";
  }

  getDescription() {
    return `An allocation from ${this.data?.program.name} has been returned to you: ${this.data?.currencyCode} ${this.data?.amount}.`;
  }

  getUrl() {
    return this.data?.sponsor.id
      ? NEXT_ROUTER.financials.details.root(this.data.sponsor.id)
      : NEXT_ROUTER.financials.root;
  }
}
