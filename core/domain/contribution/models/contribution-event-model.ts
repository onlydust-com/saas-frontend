import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ContributionEventResponse = components["schemas"]["ContributionEventResponse"];

export interface ContributionEventInterface extends ContributionEventResponse {}

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
}
