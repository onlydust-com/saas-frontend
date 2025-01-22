import { ProjectInterfaceV2 } from "@/core/domain/project/models/project-model-v2";
import { AnyType } from "@/core/kernel/types";

import { ButtonPort } from "@/design-system/atoms/button/button.types";

export interface RepoLinkProps {
  repo?: ProjectInterfaceV2["repos"][number];
  buttonProps?: ButtonPort<AnyType>;
}
