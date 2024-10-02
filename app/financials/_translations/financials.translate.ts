import enBudgetAvailable from "@/app/financials/[sponsorId]/_sections/financial-section/components/budget-available-cards/budget-available.en.json";
import enFinancialColumnChart from "@/app/financials/[sponsorId]/_sections/financial-section/components/financial-column-chart/financial-column-chart.en.json";
import enTransactionPanel from "@/app/financials/[sponsorId]/_sections/financial-section/components/transactions-sidepanel/_translations/transaction-sidepanel.en.json";
import enFinancialsDetails from "@/app/financials/[sponsorId]/_translations/financial-detail.en.json";

import enCreateProgramPanel from "../[sponsorId]/_features/create-program-panel/create-program-panel.en.json";
import enEditProgramPanel from "../[sponsorId]/_features/edit-program-panel/edit-program-panel.en.json";
import enFinancials from "./financials.en.json";

export const enFinancialsTranslation = {
  financials: {
    list: enFinancials,
    details: enFinancialsDetails,
    budgetAvailable: enBudgetAvailable,
    financialColumnChart: enFinancialColumnChart,
    createProgramPanel: enCreateProgramPanel,
    editProgramPanel: enEditProgramPanel,
    transactionPanel: enTransactionPanel,
  },
};
