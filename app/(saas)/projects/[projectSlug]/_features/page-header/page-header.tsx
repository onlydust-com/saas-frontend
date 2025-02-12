import { ProjectNavigation } from "../project-navigation/project-navigation";
import { PageHeaderProps } from "./page-header.types";

export function PageHeader({ projectSlug }: PageHeaderProps) {
  return (
    <div className="flex w-full bg-muted">
      <ProjectNavigation params={{ projectSlug }} />
    </div>
  );
}
