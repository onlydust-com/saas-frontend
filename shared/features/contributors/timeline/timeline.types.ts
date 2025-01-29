import { BiContributorInterface } from "@/core/domain/bi/models/bi-contributor-model";

export interface TimelineProps {
  user: BiContributorInterface;
  location?: "page" | "panel";
}
