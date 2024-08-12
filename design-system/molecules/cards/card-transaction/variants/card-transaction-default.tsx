import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { CardTransactionDefaultAdapter } from "../adapters/default/default.adapter";
import { CardTransactionPort } from "../card-transaction.types";

export function CardTransaction<C extends ElementType = "div">(props: CardTransactionPort<C>) {
  return withComponentAdapter<CardTransactionPort<C>>(CardTransactionDefaultAdapter)(props);
}
