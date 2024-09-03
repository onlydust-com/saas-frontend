import { RemixIconPort } from "@/design-system/atoms/icon";
import { RemixIcon } from "@/design-system/atoms/icon/variants/icon-remix";
import { Paper } from "@/design-system/atoms/paper";
import { Tag } from "@/design-system/atoms/tag";
import { Typo } from "@/design-system/atoms/typo";

import { ProjectCategoriesProps } from "./project-categories.types";

export function ProjectCategories({ categories }: ProjectCategoriesProps) {
  if (!categories.length) return null;

  return (
    <Paper size={"lg"} border={"primary"} classNames={{ base: "flex flex-col gap-lg" }}>
      <Typo size={"sm"} weight={"medium"} translate={{ token: "panels:projectDetail.categories.title" }} />

      <div className={"flex flex-wrap gap-md"}>
        {categories?.map(({ id, name, iconSlug }) => (
          <Tag
            key={id}
            size={"md"}
            classNames={{
              base: "max-w-full overflow-hidden",
              label: "whitespace-nowrap text-ellipsis overflow-hidden",
            }}
            startContent={<RemixIcon name={iconSlug as RemixIconPort["name"]} />}
          >
            {name}
          </Tag>
        ))}
      </div>
    </Paper>
  );
}
