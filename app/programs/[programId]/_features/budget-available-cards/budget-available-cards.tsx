import { useSearchParams } from "next/navigation";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { CardFinancial } from "@/design-system/molecules/card-financial";

export function BudgetAvailableCards() {
  const searchParams = useSearchParams();
  const { data } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: {
      programId: searchParams.get("programId") || "",
    },
  });
  return (
    <div className="flex gap-2">
      <CardFinancial title="Available" amount={data.} />
    </div>
  );
}
