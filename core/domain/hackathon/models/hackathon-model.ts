import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { HackathonsEventsInterface } from "./hackathon-event-model";

export type HackathonsDetailsResponse = components["schemas"]["HackathonsDetailsResponse"];

export interface HackathonInterface extends HackathonsDetailsResponse {
  getTodayEvents(): HackathonsEventsInterface[];
  getPreviousEvents(): HackathonsEventsInterface[];
  getNextEvents(): HackathonsEventsInterface[];
  events: HackathonsEventsInterface[];
}

export class Hackathon implements HackathonInterface {
  communityLinks!: HackathonsDetailsResponse["communityLinks"];
  description!: HackathonsDetailsResponse["description"];
  links!: HackathonsDetailsResponse["links"];
  totalBudget!: HackathonsDetailsResponse["totalBudget"];
  id!: HackathonsDetailsResponse["id"];
  slug!: HackathonsDetailsResponse["slug"];
  index!: HackathonsDetailsResponse["index"];
  title!: HackathonsDetailsResponse["title"];
  githubLabels!: HackathonsDetailsResponse["githubLabels"];
  location!: HackathonsDetailsResponse["location"];
  startDate!: HackathonsDetailsResponse["startDate"];
  endDate!: HackathonsDetailsResponse["endDate"];
  projects!: HackathonsDetailsResponse["projects"];
  subscriberCount!: HackathonsDetailsResponse["subscriberCount"];
  issueCount!: HackathonsDetailsResponse["issueCount"];
  openIssueCount!: HackathonsDetailsResponse["openIssueCount"];
  events!: HackathonsEventsInterface[];

  constructor(props: HackathonsDetailsResponse) {
    Object.assign(this, props);
  }

  getTodayEvents() {
    return this.events.filter(event => event.isToday());
  }

  getPreviousEvents() {
    return this.events.filter(event => event.isBeforeToday());
  }

  getNextEvents() {
    return this.events.filter(event => event.isAfterToday());
  }
}
