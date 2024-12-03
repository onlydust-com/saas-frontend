import { ProjectInterface } from "@/core/domain/project/models/project-model";
import { AnyType } from "@/core/kernel/types";

import { ButtonPort } from "@/design-system/atoms/button/button.types";

export interface ProjectMoreInfoProps {
  moreInfoItem: ProjectInterface["moreInfos"][0];
  buttonProps?: ButtonPort<AnyType>;
}
