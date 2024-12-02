import { ProjectProgramListItemInterface } from "@/core/domain/project/models/project-program-list-item";

export interface CardProgramProps {
  program: ProjectProgramListItemInterface;
  onClick?: (program: ProjectProgramListItemInterface) => void;
}
