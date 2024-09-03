import { ProgramShortInterface } from "@/core/domain/program/models/program-short-model";

import { AvatarPort } from "@/design-system/atoms/avatar";

type Program = ProgramShortInterface;

export interface ProgramGroupProps {
  programs: Program[];
  maxPrograms?: number;
  className?: string;
  avatarProps?: AvatarPort;
}
