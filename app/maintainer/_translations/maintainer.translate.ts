import enBudgetAvailable from "@/app/maintainer/[projectSlug]/_sections/financial-section/components/budget-available-cards/budget-available.en.json";
import enFinancialColumnChart from "@/app/maintainer/[projectSlug]/_sections/financial-section/components/financial-column-chart/financial-column-chart.en.json";
import enFinancialDetailSidePanel from "@/app/maintainer/[projectSlug]/_sections/financial-section/components/financial-detail-sidepanel/financial-detail-sidepanel.en.json";
import enTransactionPanel from "@/app/maintainer/[projectSlug]/_sections/financial-section/components/transactions-sidepanel/_translations/transaction-sidepanel.en.json";
import enMaintainerDetails from "@/app/maintainer/[projectSlug]/_translations/maintainer-detail.en.json";

import enMaintainer from "./maintainer.en.json";

export const enMaintainerTranslation = {
  maintainer: {
    list: enMaintainer,
    detail: enMaintainerDetails,
    budgetAvailable: enBudgetAvailable,
    financialDetailSidePanel: enFinancialDetailSidePanel,
    financialColumnChart: enFinancialColumnChart,
    transactionPanel: enTransactionPanel,
  },
};
