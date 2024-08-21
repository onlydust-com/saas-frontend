import { ProjectInterface } from "@/core/domain/project/models/project-model";

export interface ProjectContributorsProps {
  topContributors: ProjectInterface["topContributors"];
  contributorCount: ProjectInterface["contributorCount"];
}
