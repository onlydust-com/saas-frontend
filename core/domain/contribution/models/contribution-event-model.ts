import { ContributionEventTypeUnion } from "@/core/domain/contribution/models/contribution.types";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ContributionEventResponse = components["schemas"]["ContributionEventResponse"];

export interface ContributionEventInterface extends ContributionEventResponse {
  getEventType(): ContributionEventTypeUnion | undefined;
}

export class ContributionEvent implements ContributionEventInterface {
  timestamp!: ContributionEventResponse["timestamp"];
  type!: ContributionEventResponse["type"];
  assignee!: ContributionEventResponse["assignee"];
  mergedBy!: ContributionEventResponse["mergedBy"];
  linkedIssueContributionUuid!: ContributionEventResponse["linkedIssueContributionUuid"];

  constructor(props: ContributionEventResponse) {
    Object.assign(this, props);
  }

  getEventType(): ContributionEventTypeUnion | undefined {
    return this.type;
  }
}
