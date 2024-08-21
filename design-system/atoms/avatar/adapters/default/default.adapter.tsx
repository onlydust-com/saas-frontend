import onlydustLogoSpace from "@/public/images/logos/onlydust-logo-space.webp";
import Image from "next/image";
import { useMemo, useState } from "react";

import { AvatarDefaultVariants } from "@/design-system/atoms/avatar/adapters/default/default.variants";
import { getAvatarImageSize, getAvatarSrc } from "@/design-system/atoms/avatar/avatar.utils";

import { cn } from "@/shared/helpers/cn";

import { AvatarPort } from "../../avatar.types";

export function AvatarDefaultAdapter({ classNames, src, alt, name, fallback, ...props }: AvatarPort) {
  const [isError, setIsError] = useState(false);
  const { size, shape, container } = props;
  const slots = AvatarDefaultVariants({ size, shape, container });
  const imageSize = getAvatarImageSize(props.size);
  const imageSrc = getAvatarSrc(imageSize, src);

  const defaultFallback = (() => {
    if (name) {
      return undefined;
    }

    return (
      <Image
        src={onlydustLogoSpace}
        width={40}
        height={40}
        alt="OnlyDust"
        loading="lazy"
        className={"h-full w-full object-cover object-center"}
      />
    );
  })();

  const renderImage = useMemo(() => {
    if (isError || !src) {
      if (name) {
        return <div className={cn(slots.name(), classNames?.name)}>{name}</div>;
      }
      return fallback || defaultFallback;
    }

    return (
      <img
        src={imageSrc}
        className={cn(slots.img(), classNames?.img)}
        alt={alt}
        loading={"lazy"}
        onError={() => {
          setIsError(true);
        }}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, imageSrc, classNames, alt, fallback]);

  return <div className={cn(slots.base(), classNames?.base)}>{renderImage}</div>;
}
