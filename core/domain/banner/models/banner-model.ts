import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type BannerResponse = components["schemas"]["BannerResponse"];

export interface BannerInterface extends BannerResponse {}

export class Banner implements BannerInterface {
  buttonIconSlug!: BannerResponse["buttonIconSlug"];
  buttonLinkUrl!: BannerResponse["buttonLinkUrl"];
  buttonText!: BannerResponse["buttonText"];
  id!: BannerResponse["id"];
  date!: BannerResponse["date"];
  longDescription!: BannerResponse["longDescription"];
  shortDescription!: BannerResponse["shortDescription"];
  subTitle!: BannerResponse["subTitle"];
  title!: BannerResponse["title"];

  constructor(props: BannerResponse) {
    Object.assign(this, props);
  }
}
