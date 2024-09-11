import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";

import { Accordion, AccordionLoading } from "@/design-system/molecules/accordion";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { CardUsedCurrency } from "@/shared/panels/currency-list-sidepanel/_components/card-used-currency/card-used-currency";
import { UsedCurrenciesProps } from "@/shared/panels/currency-list-sidepanel/_components/used-currencies/used-currencies.types";

export function UsedCurrencies({ sponsorId }: UsedCurrenciesProps) {
  const { data, isLoading, isError } = SponsorReactQueryAdapter.client.useGetSponsor({
    pathParams: {
      sponsorId,
    },
    options: {
      enabled: Boolean(sponsorId),
    },
  });

  if (isLoading) {
    return <AccordionLoading />;
  }

  if (isError) {
    return <ErrorState />;
  }

  if (!data) return null;

  return (
    <Accordion
      id={"usedCurrencies"}
      defaultSelected={["usedCurrencies"]}
      titleProps={{
        translate: {
          token: "panels:currencyList.usedCurrencies.title",
        },
      }}
    >
      {data.totalAvailable.totalPerCurrency?.map(budget => {
        return (
          <div key={budget.currency.id}>
            <CardUsedCurrency budget={budget} />
          </div>
        );
      })}
    </Accordion>
  );
}
