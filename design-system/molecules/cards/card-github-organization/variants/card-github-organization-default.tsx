import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { CardGithubOrganizationDefaultAdapter } from "../adapters/default/default.adapter";

import { CardGithubOrganizationPort } from "../card-github-organization.types";

export function CardGithubOrganization<C extends ElementType = "div">(
  props: CardGithubOrganizationPort<C>,
) {
  return withComponentAdapter<CardGithubOrganizationPort<C>>(
    CardGithubOrganizationDefaultAdapter,
  )(props);
}
