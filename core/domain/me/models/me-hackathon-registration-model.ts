import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type MeHackathonRegistrationResponse = components["schemas"]["HackathonRegistrationResponse"];

export interface MeHackathonRegistrationInterface extends MeHackathonRegistrationResponse {}

export class MeHackathonRegistration implements MeHackathonRegistrationInterface {
  isRegistered!: MeHackathonRegistrationResponse["isRegistered"];

  constructor(props: MeHackathonRegistrationResponse) {
    Object.assign(this, props);
  }
}
