import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import { AnyType } from "@/core/kernel/types";

import { ButtonPort } from "@/design-system/atoms/button/button.types";

export interface RepoLinkProps {
  repo?: components["schemas"]["ShortGithubRepoResponse"];
  buttonProps?: ButtonPort<AnyType>;
}
