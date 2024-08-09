import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type BannerResponse = components["schemas"]["BannerResponse"];

export interface BannerInterface extends BannerResponse {}

export class Banner implements BannerInterface {
  buttonIconSlug!: BannerResponse["buttonIconSlug"];
  buttonLinkUrl!: BannerResponse["buttonLinkUrl"];
  buttonText!: BannerResponse["buttonText"];
  id!: BannerResponse["id"];
  text!: BannerResponse["text"];

  constructor(props: BannerResponse) {
    Object.assign(this, props);
  }
}
