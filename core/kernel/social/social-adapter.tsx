import { Link } from "lucide-react";

import { SocialFacadePort } from "@/core/kernel/social/social-facade-port";
import { Social, SocialPlatformChannels, SocialPlatformChannelsUnion } from "@/core/kernel/social/social.types";

import { Discord, Github, Linkedin, Telegram, Twitter, Whatsapp } from "@/shared/icons";

export class SocialAdapter implements SocialFacadePort {
  private socials: Record<SocialPlatformChannels, Social> = {
    [SocialPlatformChannels.TELEGRAM]: {
      icon: Telegram,
      label: "Telegram",
      url: ["t.me/"],
    },
    [SocialPlatformChannels.DISCORD]: {
      icon: Discord,
      label: "Discord",
    },
    [SocialPlatformChannels.TWITTER]: {
      icon: Twitter,
      label: "Twitter",
      url: ["twitter.com/", "x.com/"],
    },
    [SocialPlatformChannels.WEB]: {
      icon: Link,
      label: "Website",
    },
    [SocialPlatformChannels.LINKEDIN]: {
      icon: Linkedin,
      label: "Linkedin",
      url: ["twitter.com/", "x.com/"],
    },
    [SocialPlatformChannels.WHATSAPP]: {
      icon: Whatsapp,
      label: "Whatsapp",
    },
    [SocialPlatformChannels.GITHUB]: {
      icon: Github,
      label: "Github",
      url: ["github.com/"],
    },
  };

  getSocialPlatformByChannel(socialPlatformChannel: SocialPlatformChannelsUnion): Social {
    return this.socials[socialPlatformChannel];
  }

  getSocialPlatformByUrl(url: string): Social {
    return (
      Object.values(this.socials).find(social => social.url?.some(u => url.includes(u))) ||
      this.socials[SocialPlatformChannels.WEB]
    );
  }
}
