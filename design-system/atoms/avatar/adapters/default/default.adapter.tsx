import onlydustLogoSpace from "@/public/images/logos/onlydust-logo-space.webp";
import Image from "next/image";

import { AvatarDefaultVariants } from "@/design-system/atoms/avatar/adapters/default/default.variants";
import { useImageWithFallback } from "@/design-system/atoms/avatar/avatar.hooks";
import { getAvatarImageSize, getAvatarItemImageSize, getAvatarSrc } from "@/design-system/atoms/avatar/avatar.utils";

import { cn } from "@/shared/helpers/cn";

import { AvatarPort } from "../../avatar.types";

function AvatarItem({ classNames, size, icon, onlineIcon }: AvatarPort) {
  const slots = AvatarDefaultVariants({ size, onlineIcon });

  const iconSize = getAvatarItemImageSize(size);
  const iconSrc = getAvatarSrc(iconSize, icon?.src);

  const defaultFallback = (() => {
    return (
      <Image
        src={onlydustLogoSpace}
        className={cn(slots.icon(), classNames?.icon)}
        width={iconSize[0]}
        height={iconSize[1]}
        alt="OnlyDust"
        loading="lazy"
      />
    );
  })();

  const iconFallback = icon?.fallback || defaultFallback;

  const renderIcon = useImageWithFallback({
    src: iconSrc,
    alt: icon?.alt,
    fallback: iconFallback,
    className: cn(slots.icon(), classNames?.icon),
  });

  if (icon) {
    return renderIcon;
  }

  if (onlineIcon) {
    return <div className={cn(slots.icon(), classNames?.icon)} />;
  }

  return null;
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
  enableOptimizedImage = true,
}: AvatarPort) {
  const slots = AvatarDefaultVariants({ size, shape, name: !!name });

  const imageSize = getAvatarImageSize(size);
  const imageSrc = getAvatarSrc(imageSize, src);

  const defaultFallback = (() => {
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

  const renderImage = useImageWithFallback({
    src: enableOptimizedImage ? imageSrc : src,
    alt,
    fallback: fallback || defaultFallback,
    className: cn(slots.image(), classNames?.image),
  });

  return (
    <div className={cn(slots.base(), classNames?.base)}>
      {name ? <div className={cn(slots.name(), classNames?.name)}>{name}</div> : renderImage}

      <AvatarItem classNames={classNames} size={size} icon={icon} onlineIcon={onlineIcon} />
    </div>
  );
}
