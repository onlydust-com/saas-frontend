import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type BillingProfileCoworkerResponse = components["schemas"]["BillingProfileCoworkersPageItemResponse"];

export interface BillingProfileCoworkerInterface extends BillingProfileCoworkerResponse {}

export class BillingProfileCoworker implements BillingProfileCoworkerInterface {
  githubUserId!: BillingProfileCoworkerResponse["githubUserId"];
  login!: BillingProfileCoworkerResponse["login"];
  avatarUrl!: BillingProfileCoworkerResponse["avatarUrl"];
  isRegistered!: BillingProfileCoworkerResponse["isRegistered"];
  id!: BillingProfileCoworkerResponse["id"];
  role!: BillingProfileCoworkerResponse["role"];
  joinedAt!: BillingProfileCoworkerResponse["joinedAt"];
  invitedAt!: BillingProfileCoworkerResponse["invitedAt"];
  removable!: BillingProfileCoworkerResponse["removable"];

  constructor(props: BillingProfileCoworkerResponse) {
    Object.assign(this, props);
  }
}
