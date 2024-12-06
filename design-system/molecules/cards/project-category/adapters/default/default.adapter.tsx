import { ElementType } from "react";

import { RemixIconsName } from "@/design-system/atoms/icon/adapters/remix-icon/remix-icon-names.types";
import { RemixIcon } from "@/design-system/atoms/icon/variants/icon-remix";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { ProjectCategoryCardPort } from "../../project-category.types";
import { ProjectCategoryCardDefaultVariants } from "./default.variants";

export function ProjectCategoryCardDefaultAdapter<C extends ElementType = "div">({
  as,
  htmlProps,
  classNames,
  category,
  color = "cosmic_night",
}: ProjectCategoryCardPort<C>) {
  const Component = as || "div";
  const slots = ProjectCategoryCardDefaultVariants({ color });

  return (
    <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
      <RemixIcon
        name={category.iconSlug as RemixIconsName}
        size="lg"
        classNames={{
          base: cn(slots.icon(), classNames?.icon),
        }}
      />
      <div className="flex flex-col items-center gap-xs">
        <Typo
          size="sm"
          weight="medium"
          variant="heading"
          color="primary"
          classNames={{
            base: cn(slots.name(), classNames?.name),
          }}
        >
          {category.name}
        </Typo>
        <Typo size="xs" color="secondary">
          42 projects
        </Typo>
      </div>
    </Component>
  );
}
