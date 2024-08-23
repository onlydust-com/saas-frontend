import onlydustLogoSpace from "@/public/images/logos/onlydust-logo-space.webp";
import Image from "next/image";
import { useMemo, useState } from "react";

import { AvatarDefaultVariants } from "@/design-system/atoms/avatar/adapters/default/default.variants";
import { getAvatarImageSize, getAvatarItemImageSize, getAvatarSrc } from "@/design-system/atoms/avatar/avatar.utils";

import { cn } from "@/shared/helpers/cn";

import { AvatarPort } from "../../avatar.types";

function AvatarItem({ classNames, size, icon, onlineIcon }: AvatarPort) {
  const slots = AvatarDefaultVariants({ size, onlineIcon });

  const iconSize = getAvatarItemImageSize(size);
  const iconSrc = getAvatarSrc(iconSize, icon?.src);

  const onlineIconSize = getAvatarImageSize(size);

  if (icon) {
    return <img src={iconSrc} className={cn(slots.icon(), classNames?.icon)} alt={icon.alt} loading="lazy" />;
  }

  if (onlineIconSize) {
    return <div className={cn(slots.icon(), classNames?.icon)} />;
  }

  return <div />;
}

export function AvatarDefaultAdapter({
  classNames,
  src,
  alt,
  name,
  fallback,
  icon,
  onlineIcon,
  size,
  shape,
}: AvatarPort) {
  const [isError, setIsError] = useState(false);

  const slots = AvatarDefaultVariants({ size, shape, name: !!name });

  const imageSize = getAvatarImageSize(size);
  const imageSrc = getAvatarSrc(imageSize, src);

  const defaultFallback = (() => {
    if (name) {
      return undefined;
    }

    return (
      <Image
        src={onlydustLogoSpace}
        className={cn(slots.image(), classNames?.image)}
        width={imageSize[0]}
        height={imageSize[1]}
        alt="OnlyDust"
        loading="lazy"
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
        className={cn(slots.image(), classNames?.image)}
        alt={alt}
        loading="lazy"
        onError={() => {
          setIsError(true);
        }}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, imageSrc, classNames, alt, fallback]);

  return (
    <div className={cn(slots.base(), classNames?.base)}>
      {renderImage}

      <AvatarItem classNames={classNames} size={size} icon={icon} onlineIcon={onlineIcon} />
    </div>
  );
}
