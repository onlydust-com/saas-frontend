import { CircleCheck, CircleX, Filter, SquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";

import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";
import {
  GetApplicationsPortParams,
  GetApplicationsQueryParams,
} from "@/core/domain/application/application-contract.types";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { TableSearch } from "@/design-system/molecules/table-search";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { MARKETPLACE_ROUTER } from "@/shared/constants/router";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";
import { AccordionIgnoredContributors } from "@/shared/modals/manage-applicants-modal/_components/applicants-table/_components/accordion-ignored-contributors/accordion-ignored-contributors";
import { AccordionNewContributors } from "@/shared/modals/manage-applicants-modal/_components/applicants-table/_components/accordion-new-contributors/accordion-new-contributors";
import { AccordionProjectContributors } from "@/shared/modals/manage-applicants-modal/_components/applicants-table/_components/accordion-project-contributors/accordion-project-contributors";
import { FilterColumns } from "@/shared/modals/manage-applicants-modal/_components/applicants-table/_components/filter-columns/filter-columns";
import { useFilterColumns } from "@/shared/modals/manage-applicants-modal/_components/applicants-table/_components/filter-columns/filter-columns.hooks";
import { FilterData } from "@/shared/modals/manage-applicants-modal/_components/applicants-table/_components/filter-data/filter-data";
import { FilterDataProvider } from "@/shared/modals/manage-applicants-modal/_components/applicants-table/_components/filter-data/filter-data.context";
import { useApplicantsFilterDataSidePanel } from "@/shared/modals/manage-applicants-modal/_components/applicants-table/_components/filter-data/filter-data.hooks";
import {
  ApplicantsTableProps,
  ContributorPanelFooterProps,
} from "@/shared/modals/manage-applicants-modal/_components/applicants-table/applicants-table.types";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";

export type ApplicantsTableFilters = Omit<
  NonNullable<GetApplicationsPortParams["queryParams"]>,
  "pageSize" | "pageIndex"
>;

function Footer({ githubUserId, login, onAssign }: ContributorPanelFooterProps) {
  const { mutate: ignoreApplicationMutate, isPending: ignoreApplicationIsPending } =
    ApplicationReactQueryAdapter.client.usePatchApplication({
      pathParams: {
        applicationId: githubUserId.toString(),
      },
    });

  function handleIgnore() {
    ignoreApplicationMutate({ status: "IGNORED" });
  }

  return (
    <div className="flex w-full justify-between gap-lg">
      <div>
        <Button
          variant={"secondary"}
          endIcon={{ component: SquareArrowOutUpRight }}
          size={"md"}
          as={"a"}
          htmlProps={{
            href: marketplaceRouting(MARKETPLACE_ROUTER.publicProfile.root(login)),
            target: "_blank",
          }}
          translate={{ token: "panels:contributor.seeContributor" }}
        />
      </div>
      <div className="flex gap-lg">
        <Button
          variant={"secondary"}
          startIcon={{ component: CircleX }}
          size={"md"}
          translate={{ token: "modals:manageApplicants.table.actions.ignore" }}
          onClick={() => handleIgnore()}
          isDisabled={ignoreApplicationIsPending}
        />
        <Button
          variant={"secondary"}
          startIcon={{ component: CircleCheck }}
          size={"md"}
          translate={{ token: "modals:manageApplicants.table.actions.assign" }}
          onClick={() => onAssign(githubUserId)}
        />
      </div>
    </div>
  );
}

export function ApplicantsTable({ projectId, onAssign }: ApplicantsTableProps) {
  const [search, setSearch] = useState<string>();
  const { open: openFilterPanel } = useApplicantsFilterDataSidePanel();
  const [filters, setFilters] = useState<ApplicantsTableFilters["u"]>({});
  const [debouncedSearch, setDebouncedSearch] = useState<string>();

  const queryParams: Partial<GetApplicationsQueryParams> = {
    projectId,
    u: {
      search: debouncedSearch,
      ...filters,
    },
  };

  const { columns, selectedIds, setSelectedIds } = useFilterColumns({ onAssign });
  const filtersCount = filters ? Object.keys(filters)?.length : 0;

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <ScrollView>
        <div className={"flex flex-col gap-lg overflow-hidden"}>
          <nav className={"flex gap-md"}>
            <Button
              variant={"secondary"}
              size="sm"
              startIcon={{ component: Filter }}
              iconOnly={!filtersCount}
              onClick={() => openFilterPanel()}
              classNames={{
                content: "w-fit",
              }}
              endContent={filtersCount ? <Badge size={"xxs"}>{filtersCount}</Badge> : undefined}
            />
            <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
            <FilterColumns selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
          </nav>
          <AccordionProjectContributors projectId={projectId} queryParams={queryParams} columns={columns} />
          <AccordionNewContributors projectId={projectId} queryParams={queryParams} columns={columns} />
          <AccordionIgnoredContributors projectId={projectId} queryParams={queryParams} columns={columns} />
        </div>
        <FilterData />
        <ContributorSidepanel
          customFooter={({ data }) => (
            <Footer githubUserId={data.githubUserId} login={data.login} onAssign={onAssign} />
          )}
        />
      </ScrollView>
    </FilterDataProvider>
  );
}
