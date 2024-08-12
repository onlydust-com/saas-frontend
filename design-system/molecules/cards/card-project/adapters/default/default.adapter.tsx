import { ElementType } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { cn } from "@/shared/helpers/cn";

import { CardTemplate } from "../../../card-template";
import { CardProjectPort } from "../../card-project.types";
import { CardProjectDefaultVariants } from "./default.variants";

export function CardProjectDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  title,
  description,
  logoUrl,
  languages = [],
  categories = [],
  buttonProps,
}: CardProjectPort<C>) {
  const slots = CardProjectDefaultVariants();

  const formattedLanguages = languages.map(language => ({
    ...language,
    icon: { name: "ri-code-line" },
  }));

  const formattedCategories = categories.map(category => ({
    ...category,
    icon: { name: "ri-price-tag-3-line" },
  }));

  return (
    <CardTemplate
      as={as}
      classNames={{ base: cn(slots.base(), classNames?.base) }}
      htmlProps={htmlProps}
      avatarProps={{ src: logoUrl, shape: "square" }}
      titleProps={{
        children: title,
      }}
      descriptionProps={{
        children: description,
      }}
      tags={[...formattedLanguages, ...formattedCategories]}
      endContent={buttonProps && <Button size="l" variant="secondary-light" {...buttonProps} />}
    />
  );
}
