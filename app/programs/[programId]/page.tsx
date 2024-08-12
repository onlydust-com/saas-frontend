"use client";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

export default function ProgramPage({ params: { programId } }: { params: { programId: string } }) {
  const { data } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: {
      programId,
    },
  });

  return (
    <div>
      <h1>Program Page : {data?.name}</h1>
    </div>
  );
}
