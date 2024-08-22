import { Icon, IconPort } from "@/design-system/atoms/icon";
import { Popover } from "@/design-system/atoms/popover";
import { Tag } from "@/design-system/atoms/tag";
import { Typo } from "@/design-system/atoms/typo";

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
            icon={{ name: iconSlug as IconPort["name"] }}
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
      <Popover>
        <Popover.Trigger>
          {() => (
            <div className={"max-w-full overflow-hidden"}>
              <Tag
                size={"s"}
                style={"outline"}
                color={"white"}
                classNames={{
                  base: "max-w-full overflow-hidden",
                  label: "whitespace-nowrap text-ellipsis overflow-hidden",
                }}
                {...tagProps}
              >
                {categories?.map(({ name }) => name).join(", ")}
              </Tag>
            </div>
          )}
        </Popover.Trigger>
        <Popover.Content>
          {() => (
            <div className={"grid gap-3"}>
              {categories?.map(({ iconSlug, name }) => (
                <div key={name} className={"flex flex-row items-center gap-2"}>
                  <Icon name={iconSlug as IconPort["name"]} />
                  <Typo size={"xs"} weight={"medium"} color={"text-1"}>
                    {name}
                  </Typo>
                </div>
              ))}
            </div>
          )}
        </Popover.Content>
      </Popover>
    </div>
  );
}
