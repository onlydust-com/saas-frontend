"use client";

import { Contributions } from "@/app/manage-projects/[projectSlug]/_features/contributions/contributions";

export default function ManageProgramsContributionsPage({
  params: { projectSlug },
}: {
  params: { projectSlug: string };
}) {
  return <Contributions projectSlug={projectSlug} />;
}
