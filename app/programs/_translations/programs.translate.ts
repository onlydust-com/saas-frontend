import enGrantForm from "@/app/programs/[programId]/_features/grant-form-sidepanel/_translations/grant-form.en.json";
import enGrantList from "@/app/programs/[programId]/_features/grant-list-sidepanel/_translations/grant-list.en.json";
import enProgramsDetails from "@/app/programs/[programId]/_translations/programs-detail.en.json";
import enBudgetAvailable from "@/app/programs/[programId]/financial/_features/budget-available-cards/budget-available.en.json";
import enTransactionPanel from "@/app/programs/[programId]/financial/_features/transactions-sidepanel/_translations/transaction-sidepanel.en.json";

import enPrograms from "./programs.en.json";

export const enProgramsTranslation = {
  programs: {
    list: enPrograms,
    details: enProgramsDetails,
    transactionPanel: enTransactionPanel,
    budgetAvailable: enBudgetAvailable,
    grantList: enGrantList,
    grantForm: enGrantForm,
  },
};
