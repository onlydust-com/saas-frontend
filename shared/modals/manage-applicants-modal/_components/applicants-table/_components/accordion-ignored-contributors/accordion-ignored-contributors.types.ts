import { GetApplicationsQueryParams } from "@/core/domain/application/application-contract.types";

import { useFilterColumns } from "@/shared/modals/manage-applicants-modal/_components/applicants-table/_components/filter-columns/filter-columns.hooks";

export interface AccordionIgnoredContributorsProps {
  projectId?: string;
  queryParams: Partial<GetApplicationsQueryParams>;
  columns: ReturnType<typeof useFilterColumns>["columns"];
}
