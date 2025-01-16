import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type GithubLabelWithCountResponse = components["schemas"]["GithubLabelWithCountResponse"];

export interface GithubLabelWithCountInterface extends GithubLabelWithCountResponse {}

export class GithubLabelWithCount implements GithubLabelWithCountInterface {
  name!: GithubLabelWithCountResponse["name"];
  description!: GithubLabelWithCountResponse["description"];
  count!: GithubLabelWithCountResponse["count"];

  constructor(props: GithubLabelWithCountResponse) {
    Object.assign(this, props);
  }
}
