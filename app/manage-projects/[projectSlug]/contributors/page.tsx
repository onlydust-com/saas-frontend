"use client";

import { ContributorsTable } from "@/app/manage-projects/[projectSlug]/contributors/_features/contributors-table/contributors-table";

export default function ManageProgramsContributorsPage({
  params: { projectSlug },
}: {
  params: { projectSlug: string };
}) {
  return <ContributorsTable projectSlug={projectSlug} />;
}
