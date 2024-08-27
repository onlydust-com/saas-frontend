import { CardFinancialDefaultAdapter } from "design-system/molecules/cards/card-financial/adapters/default/default.adapter";
import { CardFinancialPort } from "design-system/molecules/cards/card-financial/card-financial.types";
import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

export function CardFinancial<C extends ElementType = "div">(props: CardFinancialPort<C>) {
  return withComponentAdapter<CardFinancialPort<C>>(CardFinancialDefaultAdapter)(props);
}
