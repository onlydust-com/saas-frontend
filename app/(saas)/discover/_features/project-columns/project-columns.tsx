import { Button } from "@/shared/ui/button";
import { ProjectCard } from "../../_components/project-card/project-card";
import { ProjectColumnsSectionProps } from "./project-columns.types";

export function ProjectColumnsSection({ projects }: ProjectColumnsSectionProps) {
  return (
    <section>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Trending Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Trending</h2>
            <Button variant="secondary" size="sm">See more</Button>
          </div>
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>

        {/* Most Collaborative Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Most Collaborative</h2>
            <Button variant="secondary" size="sm">See more</Button>
          </div>
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>

        {/* Recently Active Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recently Active</h2>
            <Button variant="secondary" size="sm">See more</Button>
          </div>
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 