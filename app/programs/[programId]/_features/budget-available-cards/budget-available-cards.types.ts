import { ProgramResponse } from "@/core/domain/program/models/program-model";

export interface CreateAvatarGroupProps {
  total: ProgramResponse["totalAvailable" | "totalGranted" | "totalRewarded"];
}
