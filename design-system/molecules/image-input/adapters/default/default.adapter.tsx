import { ChangeEvent, ElementType, useEffect, useState } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { FieldContainer } from "@/design-system/atoms/field-container";

import { cn } from "@/shared/helpers/cn";

import { ImageInputPort } from "../../image-input.types";
import { ImageInputDefaultVariants } from "./default.variants";

export function ImageInputDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  name,
  maxSizeMo,
  isError,
  description,
  label,
  info,
  error,
  onChange,
  value,
  buttonProps,
}: ImageInputPort<C>) {
  const Component = as || "div";
  const slots = ImageInputDefaultVariants();
  const bytesToMegaBytes = (bytes: number) => bytes / (1024 * 1024);

  const [preview, setPreview] = useState<string | undefined>(undefined);

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!maxSizeMo || bytesToMegaBytes(file.size) <= maxSizeMo) {
        setPreview(URL.createObjectURL(file));
        onChange?.(file);
      }
    }
  };

  useEffect(() => {
    if (value) {
      setPreview(value);
    }
  }, [value]);

  return (
    <FieldContainer name={name} isError={isError} label={label} description={description} info={info} error={error}>
      <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
        <Avatar src={preview} enableOptimizedImage={false} shape={"squared"} size={"md"} />
        <Button
          size={"sm"}
          classNames={{ base: "w-full" }}
          variant={"secondary"}
          {...buttonProps}
          as={"label"}
          htmlProps={{ htmlFor: name }}
        />
        <input
          id={name}
          type="file"
          className={"hidden"}
          accept="image/png, image/jpeg, image/jpg, image/gif, image/svg+xml"
          onChange={onImageChange}
        />
      </Component>
    </FieldContainer>
  );
}
