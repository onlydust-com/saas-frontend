import { Notification } from "@/core/domain/notification/models/notification-model";
import { NotificationInterface } from "@/core/domain/notification/models/notification.types";
import { NotificationStatus } from "@/core/domain/notification/notification-constants";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { NEXT_ROUTER } from "@/shared/constants/router";

export class ProgramLeadFundsAllocatedToProgram implements NotificationInterface {
  data: components["schemas"]["NotificationProgramLeadFundsAllocatedToProgram"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.programLeadFundsAllocatedToProgram;
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
    return "New allocation received";
  }

  getDescription() {
    return `You have received a new allocation from ${this.data?.sponsor.name}: ${this.data?.amount} ${this.data?.currencyCode}.`;
  }

  getUrl() {
    return this.data?.program.id ? NEXT_ROUTER.programs.projects.root(this.data.program.id) : NEXT_ROUTER.programs.root;
  }
}
