import enGrantForm from "@/app/programs/[programId]/_features/grant-form-sidepanel/_translations/grant-form.en.json";
import enGrantList from "@/app/programs/[programId]/_features/grant-list-sidepanel/_translations/grant-list.en.json";
import enProgramsDetails from "@/app/programs/[programId]/_translations/programs-detail.en.json";
import enBudgetAvailable from "@/app/programs/[programId]/_views/financial/budget-available-cards/budget-available.en.json";
import enFinancialColumnChart from "@/app/programs/[programId]/_views/financial/financial-column-chart/financial-column-chart.en.json";
import enTransactionPanel from "@/app/programs/[programId]/_views/financial/transactions-sidepanel/_translations/transaction-sidepanel.en.json";

import enPrograms from "./programs.en.json";

export const enProgramsTranslation = {
  programs: {
    list: enPrograms,
    details: enProgramsDetails,
    transactionPanel: enTransactionPanel,
    financialColumnChart: enFinancialColumnChart,
    budgetAvailable: enBudgetAvailable,
    grantList: enGrantList,
    grantForm: enGrantForm,
  },
};
