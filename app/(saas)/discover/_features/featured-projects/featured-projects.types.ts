import { Project } from "@/core/domain/project/project.entity";

export interface FeaturedProjectsSectionProps {
  projects: Project[];
  isLoading: boolean;
  isError: boolean;
} 