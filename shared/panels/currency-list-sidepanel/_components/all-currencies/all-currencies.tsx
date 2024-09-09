import { CurrencyReactQueryAdapter } from "@/core/application/react-query-adapter/currency";

import { Accordion, AccordionLoading } from "@/design-system/molecules/accordion";

import { ErrorState } from "@/shared/components/error-state/error-state";

export function AllCurrencies() {
  const { data, isLoading, isError } = CurrencyReactQueryAdapter.client.useGetSupportedCurrencies({});

  if (isLoading) {
    return <AccordionLoading />;
  }

  if (isError) {
    return <ErrorState />;
  }

  if (!data) return null;

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
      {data.currencies.map(currency => {
        return (
          <div key={currency.id}>
            {/* TODO @hayden what component do I use here ? */}
            {currency.name}
          </div>
        );
      })}
    </Accordion>
  );
}
