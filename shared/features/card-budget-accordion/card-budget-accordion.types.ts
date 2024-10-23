import { AccordionItemProps, AccordionPort } from "@/design-system/molecules/accordion";
import { CardBudgetPort } from "@/design-system/molecules/cards/card-budget";

interface AccordionItem extends Omit<AccordionItemProps, "content"> {
  cards: CardBudgetPort<"div">[];
}

export interface CardBudgetAccordionProps extends Pick<AccordionPort, "multiple" | "defaultSelected"> {
  items: AccordionItem[];
}
