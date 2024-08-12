"use client";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { NEXT_ROUTER } from "@/shared/constants/router";

export default function ProgramsPage() {
  const { data } = ProgramReactQueryAdapter.client.useGetPrograms({});
  const programs = data?.pages.flatMap(page => page.programs) || [];
  return (
    <div className="flex flex-col gap-3">
      {programs.map(program => (
        <div key={program.name}>
          <BaseLink href={NEXT_ROUTER.programs.details.root(program.id)}>{program.name}</BaseLink>
        </div>
      ))}
    </div>
  );
}
