import { CurrencyReactQueryAdapter } from "@/core/application/react-query-adapter/currency";
import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";

import { Accordion, AccordionLoading } from "@/design-system/molecules/accordion";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { AllCurrenciesProps } from "@/shared/panels/currency-list-sidepanel/_components/all-currencies/all-currencies.types";
import { CardAllCurrency } from "@/shared/panels/currency-list-sidepanel/_components/card-all-currency/card-all-currency";

export function AllCurrencies({ sponsorId }: AllCurrenciesProps) {
  const {
    data: sponsorData,
    isLoading: isLoadingSponsor,
    isError: isErrorSponsor,
  } = SponsorReactQueryAdapter.client.useGetSponsor({
    pathParams: {
      sponsorId,
    },
    options: {
      enabled: Boolean(sponsorId),
    },
  });

  const {
    data: allCurrenciesData,
    isLoading: isLoadingAllCurrencies,
    isError: isErrorAllCurrencies,
  } = CurrencyReactQueryAdapter.client.useGetSupportedCurrencies({});

  const isLoading = isLoadingSponsor || isLoadingAllCurrencies;
  const isError = isErrorSponsor || isErrorAllCurrencies;

  if (isLoading) {
    return <AccordionLoading />;
  }

  if (isError) {
    return <ErrorState />;
  }

  if (!allCurrenciesData) return null;

  const usedCurrencies = sponsorData?.totalAvailable.totalPerCurrency?.map(budget => budget.currency.id) || [];
  const allCurrencies = allCurrenciesData.currencies.filter(
    currency => !usedCurrencies.includes(currency.id) && currency.onlyDustWallets?.length
  );

  return (
    <Accordion
      id={"allCurrencies"}
      defaultSelected={["allCurrencies"]}
      titleProps={{
        translate: {
          token: "panels:currencyList.allCurrencies.title",
        },
      }}
    >
      {allCurrencies.map(currency => {
        return (
          <div key={currency.id}>
            <CardAllCurrency currency={currency} />
          </div>
        );
      })}
    </Accordion>
  );
}
