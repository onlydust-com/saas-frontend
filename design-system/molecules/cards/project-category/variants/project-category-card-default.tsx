import { ElementType } from "react";

import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { ProjectCategoryCardDefaultAdapter } from "../adapters/default/default.adapter";
import { ProjectCategoryCardPort } from "../project-category.types";

export function ProjectCategoryCard<C extends ElementType = "div">(props: ProjectCategoryCardPort<C>) {
  return withComponentAdapter<ProjectCategoryCardPort<C>>(ProjectCategoryCardDefaultAdapter)(props);
}
