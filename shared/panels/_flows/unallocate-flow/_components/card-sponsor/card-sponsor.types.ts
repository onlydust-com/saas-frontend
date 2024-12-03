import { ProgramSponsorListItemInterface } from "@/core/domain/program/models/program-sponsor-list-item";

export interface CardSponsorProps {
  sponsor: ProgramSponsorListItemInterface;
  onClick?: (program: ProgramSponsorListItemInterface) => void;
}
