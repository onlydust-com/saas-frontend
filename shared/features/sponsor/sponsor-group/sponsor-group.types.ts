import { TagPort } from "@/design-system/atoms/tag";

interface sponsor {
  logoUrl: string;
  name: string;
}
export interface SponsorGroupProps {
  sponsors: sponsor[];
  maxSponsors?: number;
  maxSponsorsAvatar?: number;
  className?: string;
  tagProps?: TagPort<"div">;
}
