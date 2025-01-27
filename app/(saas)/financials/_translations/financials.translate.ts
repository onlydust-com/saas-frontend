import enFinancialsDetails from "@/app/(saas)/financials/[sponsorId]/_translations/financial-detail.en.json";
import enBudgetAvailable from "@/app/(saas)/financials/[sponsorId]/financial/_features/budget-available-cards/budget-available.en.json";
import enTransactions from "@/app/(saas)/financials/[sponsorId]/financial/_features/transactions/_translations/transactions.en.json";
import enCreateProgramPanel from "@/app/(saas)/financials/[sponsorId]/programs/_features/create-program-panel/create-program-panel.en.json";
import enEditProgramPanel from "@/app/(saas)/financials/[sponsorId]/programs/_features/edit-program-panel/edit-program-panel.en.json";

import enFinancials from "./financials.en.json";

export const enFinancialsTranslation = {
  financials: {
    list: enFinancials,
    details: enFinancialsDetails,
    budgetAvailable: enBudgetAvailable,
    createProgramPanel: enCreateProgramPanel,
    editProgramPanel: enEditProgramPanel,
    transactions: enTransactions,
  },
};
