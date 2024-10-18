import { ContributionEventType } from "@/core/domain/contribution/models/contribution.types";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ContributionEventResponse = components["schemas"]["ContributionEventResponse"];

export interface ContributionEventInterface extends ContributionEventResponse {
  getEventType(): ContributionEventType | undefined;
}

export class ContributionEvent implements ContributionEventInterface {
  timestamp!: ContributionEventResponse["timestamp"];
  assigneeAdded!: ContributionEventResponse["assigneeAdded"];
  assigneeRemoved!: ContributionEventResponse["assigneeRemoved"];
  opened!: ContributionEventResponse["opened"];
  merged!: ContributionEventResponse["merged"];
  closed!: ContributionEventResponse["closed"];
  issueLinked!: ContributionEventResponse["issueLinked"];
  issueUnlinked!: ContributionEventResponse["issueUnlinked"];

  constructor(props: ContributionEventResponse) {
    Object.assign(this, props);
  }

  getEventType(): ContributionEventType | undefined {
    switch (true) {
      case !!this.assigneeAdded:
        return ContributionEventType.CONTRIBUTOR_ASSIGNED;
      case !!this.assigneeRemoved:
        return ContributionEventType.CONTRIBUTOR_REMOVED;
      case !!this.opened:
        return ContributionEventType.PR_CREATED;
      case !!this.merged:
        return ContributionEventType.TO_REVIEW;
      case !!this.closed:
        return ContributionEventType.CLOSED;
      case !!this.issueLinked:
        return ContributionEventType.ISSUE_CREATED;
      default:
        return undefined;
    }
  }
}
