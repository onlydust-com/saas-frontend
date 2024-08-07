import onlydustLogoSpace from "@/public/images/logos/onlydust-logo-space.webp";
import { Avatar as NextAvatar } from "@nextui-org/avatar";
import Image from "next/image";

import { getAvatarImageSize, getAvatarSrc } from "@/design-system/atoms/avatar/avatar.utils";

import { cn } from "@/shared/helpers/cn";

import { AvatarPort } from "../../avatar.types";
import { AvatarNextUiVariants } from "./next-ui.variants";

export function AvatarNextUiAdapter({
  classNames,
  src,
  alt,
  name,
  showFallback = true,
  fallback,
  ...props
}: AvatarPort) {
  const { size, shape, container, ...nextUiProps } = props;
  const slots = AvatarNextUiVariants({ size, shape, container });
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

  return (
    <NextAvatar
      name={name}
      showFallback={showFallback}
      fallback={fallback || defaultFallback}
      classNames={{
        base: cn(slots.base(), classNames?.base),
        fallback: cn(slots.fallback(), classNames?.fallback),
        img: cn(slots.img(), classNames?.img),
        name: cn(slots.name(), classNames?.name),
        icon: cn(slots.icon()),
      }}
      {...nextUiProps}
      src={imageSrc}
      alt={alt}
    />
  );
}
