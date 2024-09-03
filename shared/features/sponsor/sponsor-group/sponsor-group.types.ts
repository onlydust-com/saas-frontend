import { AvatarPort } from "@/design-system/atoms/avatar";

interface sponsor {
  logoUrl: string;
  name: string;
}
export interface SponsorGroupProps {
  sponsors: sponsor[];
  maxSponsors?: number;
  className?: string;
  avatarProps?: AvatarPort;
}
