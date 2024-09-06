import enBudgetAvailable from "@/app/financials/[sponsorId]/_sections/financial-section/components/budget-available-cards/budget-available.en.json";
import enFinancialColumnChart from "@/app/financials/[sponsorId]/_sections/financial-section/components/financial-column-chart/financial-column-chart.en.json";
import enFinancialDetailSidePanel from "@/app/financials/[sponsorId]/_sections/financial-section/components/financial-detail-sidepanel/financial-detail-sidepanel.en.json";
import enFinancialsDetails from "@/app/financials/[sponsorId]/_translations/financial-detail.en.json";

import enFinancials from "./financials.en.json";

export const enFinancialsTranslation = {
  financials: {
    list: enFinancials,
    details: enFinancialsDetails,
    budgetAvailable: enBudgetAvailable,
    financialDetailSidePanel: enFinancialDetailSidePanel,
    financialColumnChart: enFinancialColumnChart,
  },
};
