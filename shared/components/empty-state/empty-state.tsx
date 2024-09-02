"use client";

import Categories from "@/public/images/empty-state/categories.webp";
import Image from "next/image";
import { ElementType } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { EmptyStateProps } from "@/shared/components/empty-state/empty-state.types";

export function EmptyState<C extends ElementType = "div">({
  as,
  htmlProps,
  titleTranslate,
  descriptionTranslate,
  actionLabelTranslate,
  onAction,
}: EmptyStateProps<C>) {
  const Component = as || "section";

  return (
    <Paper
      size={"sm"}
      classNames={{ base: "flex flex-col items-center justify-center gap-4 p-6 text-center" }}
      background={"secondary"}
      as={Component}
      {...htmlProps}
      py={"xl"}
    >
      <div className="w-20">
        <Image src={Categories} width={80} height={80} alt={"emptyStatePictureFallback"} />
      </div>
      {titleTranslate || descriptionTranslate ? (
        <div className="flex flex-col gap-2">
          {titleTranslate ? (
            <Typo
              variant="heading"
              size={"md"}
              color={"primary"}
              classNames={{ base: "mb-1" }}
              translate={titleTranslate}
            />
          ) : null}
          {descriptionTranslate ? <Typo size={"md"} color={"secondary"} translate={descriptionTranslate} /> : null}
        </div>
      ) : null}
      {actionLabelTranslate ? (
        <Button
          size="md"
          classNames={{ base: "hidden md:block" }}
          variant="primary"
          translate={actionLabelTranslate}
          onClick={onAction}
        />
      ) : null}
    </Paper>
  );
}
