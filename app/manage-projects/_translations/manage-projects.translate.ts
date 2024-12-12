import enContributorsBulkPanel from "@/app/manage-projects/[projectSlug]/contributors/_features/contributors-table/_features/contributors-bulk-sidepanel/contributors-bulk-sidepanel.en.json";
import enBudgetAvailable from "@/app/manage-projects/[projectSlug]/financial/_features/budget-available-cards/budget-available.en.json";
import enFinancialColumnChart from "@/app/manage-projects/[projectSlug]/financial/_features/financial-column-chart/financial-column-chart.en.json";

import enManageProjectsDetails from "../[projectSlug]/_translations/manage-project-detail.en.json";
import enManageProjects from "../_translations/manage-projects.en.json";

export const enManageProjectsTranslation = {
  manageProjects: {
    list: enManageProjects,
    detail: enManageProjectsDetails,
    budgetAvailable: enBudgetAvailable,
    financialColumnChart: enFinancialColumnChart,
    bulk: enContributorsBulkPanel,
  },
};
