import { BiProjectAcquisitionResponse } from "@/core/domain/bi/models/bi-projects-acquisition-model";

export interface AcquisitionFunnelProps {
  projectId: string;
}

export interface AcquisitionFunnelHookProps {
  globalVisitorCount: BiProjectAcquisitionResponse["globalVisitorCount"];
  projectVisitorCount: BiProjectAcquisitionResponse["projectVisitorCount"];
  applicantCount: BiProjectAcquisitionResponse["applicantCount"];
  assigneeCount: BiProjectAcquisitionResponse["assigneeCount"];
  contributorCount: BiProjectAcquisitionResponse["contributorCount"];
}
