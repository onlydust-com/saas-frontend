"use client";

import { Download } from "lucide-react";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";
import { GetBiContributorsQueryParams } from "@/core/domain/bi/bi-contract.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { toast } from "@/design-system/molecules/toaster";

import { Translate } from "@/shared/translation/components/translate/translate";

export function ExportCsv({ queryParams }: { queryParams: Partial<GetBiContributorsQueryParams> }) {
  const fileKernelPort = bootstrap.getFileKernelPort();

  const { mutate, isPending } = BiReactQueryAdapter.client.useGetBiContributorsCsv({
    queryParams: {
      ...queryParams,
      showFilteredKpis: false,
      contributionStatuses: ["COMPLETED"],
      pageIndex: 0,
      pageSize: 10000,
    },
    options: {
      onSuccess: data => {
        fileKernelPort.download({
          blob: data,
          name: `contributors-${new Date().getTime()}`,
          extension: "csv",
        });

        toast.success(<Translate token={"data:deepDive.contributorsTable.export.success"} />);
      },
      onError: () => {
        toast.error(<Translate token={"data:deepDive.contributorsTable.export.error"} />);
      },
    },
  });

  function handleClick() {
    mutate({});
  }

  return (
    <Tooltip content={<Translate token={"data:deepDive.contributorsTable.export.tooltip"} />}>
      <Button
        variant={"secondary"}
        size="sm"
        startIcon={{ component: Download }}
        iconOnly
        onClick={handleClick}
        isDisabled={isPending}
      />
    </Tooltip>
  );
}
