import { SocialFacadePort } from "@/core/kernel/social/social-facade-port";

import { Discord } from "@/shared/icons";

export class SocialAdapterMock implements SocialFacadePort {
  getSocialPlatformByChannel() {
    return {
      icon: Discord,
      label: "",
    };
  }

  getSocialPlatformByUrl() {
    return {
      icon: Discord,
      label: "",
    };
  }
}
