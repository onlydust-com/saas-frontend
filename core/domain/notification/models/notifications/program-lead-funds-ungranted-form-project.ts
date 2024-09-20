import { Notification } from "@/core/domain/notification/models/notification-model";
import { NotificationInterface } from "@/core/domain/notification/models/notification.types";
import { NotificationStatus } from "@/core/domain/notification/notification-constants";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { NEXT_ROUTER } from "@/shared/constants/router";

export class ProgramLeadFundsUngrantedFromProject implements NotificationInterface {
  data: components["schemas"]["NotificationProgramLeadFundsUngrantedFromProject"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.programLeadFundsUngrantedFromProject;
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
    return "Grant returned to you from project";
  }

  getDescription() {
    return `A grant from ${this.data?.project.name} has been returned to you: ${this.data?.amount} ${this.data?.currencyCode}.`;
  }

  getUrl() {
    return this.data?.program.id ? NEXT_ROUTER.programs.details.root(this.data.program.id) : NEXT_ROUTER.programs.root;
  }
}
