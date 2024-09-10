import { Accordion } from "@/design-system/molecules/accordion";
import { CardBudget } from "@/design-system/molecules/cards/card-budget";

import { CardBudgetAccordionProps } from "@/shared/features/card-budget-accordion/card-budget-accordion.types";

export function CardBudgetAccordion({ items, multiple, defaultSelected }: CardBudgetAccordionProps) {
  const cards = items.map(item => ({
    id: item.id,
    titleProps: item.titleProps,
    content: (
      <>
        {item.cards.map((card, index) => (
          <div key={`${item.id}-${index}`}>
            <CardBudget size={"none"} background={"transparent"} border={"none"} {...card} />
          </div>
        ))}
      </>
    ),
  }));

  return <Accordion items={cards} multiple={multiple} defaultSelected={defaultSelected} />;
}
