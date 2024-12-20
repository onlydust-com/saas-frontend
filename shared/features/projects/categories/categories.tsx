import { useEffect, useState } from "react";
import { useMeasure } from "react-use";

import { Badge } from "@/design-system/atoms/badge";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";

import { CategoriesProps } from "./categories.types";

export function Categories({ categories = [] }: CategoriesProps) {
  const [containerRef, { width: containerWidth }] = useMeasure<HTMLDivElement>();
  const [innerRef, { width: innerWidth }] = useMeasure<HTMLDivElement>();
  const [visibleCategories, setVisibleCategories] = useState<NonNullable<CategoriesProps["categories"]>>(categories);
  const [hiddenCategories, setHiddenCategories] = useState<NonNullable<CategoriesProps["categories"]>>([]);

  useEffect(() => {
    if (!containerWidth || !innerWidth || !categories?.length) return;

    if (innerWidth > containerWidth) {
      setVisibleCategories(prev => prev.slice(0, -1));
      setHiddenCategories(prev => [visibleCategories[visibleCategories.length - 1], ...prev]);
    }
  }, [containerWidth, innerWidth, categories?.length]);

  if (!categories.length) return null;

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div ref={innerRef} className="inline-flex items-center gap-xs">
        {visibleCategories.map(category => (
          <Badge
            key={category.name}
            color="grey"
            variant="outline"
            shape="rounded"
            size="xs"
            classNames={{ base: "js-badge" }}
          >
            {category.name}
          </Badge>
        ))}

        {hiddenCategories.length ? (
          <Tooltip
            background="primary"
            placement="bottom"
            content={
              <ul className="flex flex-col gap-md">
                {hiddenCategories.map(category => (
                  <Typo key={category.name} as="li" size="xs" weight="medium">
                    {category.name}
                  </Typo>
                ))}
              </ul>
            }
          >
            <Badge color="brand" shape="rounded" size="xs" variant="outline" classNames={{ base: "cursor-default" }}>
              +{hiddenCategories.length}
            </Badge>
          </Tooltip>
        ) : null}
      </div>
    </div>
  );
}
