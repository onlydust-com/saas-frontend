import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { CardFinancialDefaultAdapter } from "../adapters/default/default.adapter";
import { CardFinancialPort } from "../card-financial.types";

export function CardFinancial<C extends ElementType = "div">(props: CardFinancialPort<C>) {
  return withComponentAdapter<CardFinancialPort<C>>(CardFinancialDefaultAdapter)(props);
}
