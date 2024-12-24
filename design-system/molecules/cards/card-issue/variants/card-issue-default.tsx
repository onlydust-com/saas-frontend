import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { CardIssueDefaultAdapter } from "../adapters/default/default.adapter";

import { CardIssuePort } from "../card-issue.types";

export function CardIssue<C extends ElementType = "div">(
  props: CardIssuePort<C>,
) {
  return withComponentAdapter<CardIssuePort<C>>(CardIssueDefaultAdapter)(props);
}
