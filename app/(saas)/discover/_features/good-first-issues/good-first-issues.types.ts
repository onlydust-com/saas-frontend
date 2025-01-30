import { Project } from "@/core/domain/project/project.entity";

export interface GoodFirstIssuesSectionProps {
  projects: Project[];
  isLoading: boolean;
  isError: boolean;
} 