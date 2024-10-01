import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { CardGithubRepoDefaultAdapter } from "../adapters/default/default.adapter";

import { CardGithubRepoPort } from "../card-github-repo.types";

export function CardGithubRepo<C extends ElementType = "div">(
  props: CardGithubRepoPort<C>,
) {
  return withComponentAdapter<CardGithubRepoPort<C>>(
    CardGithubRepoDefaultAdapter,
  )(props);
}
