import { RemixIconsName } from "@/design-system/atoms/icon/adapters/remix-icon/remix-icon-names.types";
import { Tag } from "@/design-system/atoms/tag";

import { cn } from "@/shared/helpers/cn";

import { ProjectCategoriesGroupProps } from "./project-categories-group.types";

export function ProjectCategoriesGroup({
  categories,
  maxCategories,
  tagProps = {},
  className,
}: ProjectCategoriesGroupProps) {
  if (!maxCategories || categories.length <= maxCategories) {
    return (
      <div className={cn("flex flex-row flex-wrap gap-1", className)}>
        {categories?.map(({ name, iconSlug }) => (
          <Tag
            key={name}
            size={"s"}
            style={"outline"}
            color={"white"}
            classNames={{
              base: "max-w-full overflow-hidden",
              label: "whitespace-nowrap text-ellipsis overflow-hidden",
            }}
            icon={{ name: iconSlug as RemixIconsName }}
            {...tagProps}
          >
            {name}
          </Tag>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-row flex-wrap gap-1", className)}>
      <Tag
        size={"s"}
        style={"outline"}
        color={"white"}
        classNames={{ base: "max-w-full overflow-hidden", label: "whitespace-nowrap text-ellipsis overflow-hidden" }}
        {...tagProps}
      >
        {categories?.map(({ name }) => name).join(", ")}
      </Tag>
    </div>
  );
}
