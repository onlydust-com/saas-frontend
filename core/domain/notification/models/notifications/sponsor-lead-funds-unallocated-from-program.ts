import { Notification } from "@/core/domain/notification/models/notification-model";
import { NotificationInterface } from "@/core/domain/notification/models/notification.types";
import { NotificationStatus } from "@/core/domain/notification/notification-constants";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

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
    // TODO @hayden
    return "";
  }

  getDescription() {
    // TODO @hayden
    return "";
  }

  getUrl() {
    // TODO @hayden
    return undefined;
  }
}
