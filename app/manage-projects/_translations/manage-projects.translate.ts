import enBudgetAvailable from "@/app/manage-projects/[projectSlug]/_sections/financial-section/components/budget-available-cards/budget-available.en.json";
import enFinancialColumnChart from "@/app/manage-projects/[projectSlug]/_sections/financial-section/components/financial-column-chart/financial-column-chart.en.json";
import enTransactionPanel from "@/app/manage-projects/[projectSlug]/_sections/financial-section/components/transactions-sidepanel/_translations/transaction-sidepanel.en.json";

import enManageProjectsDetails from "../[projectSlug]/_translations/manage-project-detail.en.json";
import enContributorsBulkPanel from "../[projectSlug]/features/contributors-table/_features/contributors-bulk-sidepanel/contributors-bulk-sidepanel.en.json";
import enManageProjects from "../_translations/manage-projects.en.json";

export const enManageProjectsTranslation = {
  manageProjects: {
    list: enManageProjects,
    detail: enManageProjectsDetails,
    budgetAvailable: enBudgetAvailable,
    financialColumnChart: enFinancialColumnChart,
    transactionPanel: enTransactionPanel,
    bulk: enContributorsBulkPanel,
  },
};
