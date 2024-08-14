"use client";

import Categories from "@/public/images/empty-state/categories.webp";
import Image from "next/image";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

import { EmptyStateProps } from "@/shared/components/empty-state/empty-state.types";

export function EmptyState({
  as = "section",
  titleTranslate,
  descriptionTranslate,
  actionLabelTranslate,
  onAction,
}: EmptyStateProps) {
  const Component = as;

  return (
    <Component className="flex flex-col items-center justify-center gap-6 p-6 text-center">
      <div className="w-20">
        <Image src={Categories} width={80} height={80} alt={"emptyStatePictureFallback"} />
      </div>
      <div className="flex flex-col gap-2">
        {titleTranslate ? (
          <Typo variant="brand" size={"xl"} color={"text-1"} classNames={{ base: "mb-1" }} translate={titleTranslate} />
        ) : null}
        {descriptionTranslate ? <Typo size={"m"} color={"text-2"} translate={descriptionTranslate} /> : null}
      </div>
      {actionLabelTranslate ? (
        <Button
          size="m"
          classNames={{ base: "hidden md:block" }}
          variant="primary"
          translate={actionLabelTranslate}
          onClick={onAction}
        />
      ) : null}
    </Component>
  );
}
