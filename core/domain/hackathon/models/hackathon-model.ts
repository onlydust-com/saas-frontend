import { HackathonsList, HackathonsListInterface } from "@/core/domain/hackathon/models/hackathon-list-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { HackathonsEventsInterface } from "./hackathon-event-model";

export type HackathonsDetailsResponse = components["schemas"]["HackathonsDetailsResponse"];

export interface HackathonInterface extends HackathonsDetailsResponse, HackathonsListInterface {
  // TODO @hayden get the back to sync this
  projects: HackathonsDetailsResponse["projects"];
  getTodayEvents(): HackathonsEventsInterface[];
  getPreviousEvents(): HackathonsEventsInterface[];
  getNextEvents(): HackathonsEventsInterface[];
  events: HackathonsEventsInterface[];
}

export class Hackathon extends HackathonsList implements HackathonInterface {
  communityLinks!: HackathonsDetailsResponse["communityLinks"];
  description!: HackathonsDetailsResponse["description"];
  links!: HackathonsDetailsResponse["links"];
  totalBudget!: HackathonsDetailsResponse["totalBudget"];
  events!: HackathonsEventsInterface[];

  declare projects: HackathonsDetailsResponse["projects"];

  constructor(props: HackathonsDetailsResponse) {
    super(props);
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
