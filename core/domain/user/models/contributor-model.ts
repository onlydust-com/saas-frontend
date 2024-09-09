import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ContributorResponse = components["schemas"]["ContributorResponse"];

export interface ContributorInterface extends ContributorResponse {}

export class Contributor implements ContributorInterface {
  githubUserId!: ContributorResponse["githubUserId"];
  login!: ContributorResponse["login"];
  avatarUrl!: ContributorResponse["avatarUrl"];
  isRegistered!: ContributorResponse["isRegistered"];

  constructor(props: ContributorResponse) {
    Object.assign(this, props);
  }
}
