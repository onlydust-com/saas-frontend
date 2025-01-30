"use client";

import { ProjectSubSection } from "../project-sub-section/project-sub-section";

export function ProjectsSections() {
  return (
    <div className="grid w-full grid-cols-3 gap-16">
      <ProjectSubSection
        title="Projects with Good first issues"
        filter={{
          pageIndex: 0,
          pageSize: 3,
          tags: ["HAS_GOOD_FIRST_ISSUES"],
        }}
      />
      <ProjectSubSection
        title="Projects with Good first issues"
        filter={{
          pageIndex: 0,
          pageSize: 3,
          tags: ["HAS_GOOD_FIRST_ISSUES"],
        }}
      />
      <ProjectSubSection
        title="Projects with Good first issues"
        filter={{
          pageIndex: 0,
          pageSize: 3,
          tags: ["HAS_GOOD_FIRST_ISSUES"],
        }}
      />
    </div>
  );
}
