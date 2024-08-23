import process from "process";

import { AvatarPort } from "@/design-system/atoms/avatar/avatar.types";

export function getAvatarItemOnlineIconSize(size: AvatarPort["size"]): [number, number] {
  switch (size) {
    case "3xl":
      return [20, 20];
    case "2xl":
      return [16, 16];
    case "xl":
      return [12, 12];
    case "lg":
      return [10, 10];
    case "md":
      return [8, 8];
    case "s":
      return [6, 6];
    case "xs":
      return [5, 5];
    case "xxs":
      return [6, 6];

    default:
      return [8, 8];
  }
}

export function getAvatarItemImageSize(size: AvatarPort["size"]): [number, number] {
  switch (size) {
    case "3xl":
      return [32, 32];
    case "2xl":
      return [24, 24];
    case "xl":
      return [20, 20];
    case "lg":
      return [16, 16];
    case "md":
      return [14, 14];
    case "s":
      return [12, 12];
    case "xs":
      return [12, 12];
    case "xxs":
      return [10, 10];

    default:
      return [14, 14];
  }
}

export function getAvatarImageSize(size: AvatarPort["size"]): [number, number] {
  switch (size) {
    case "3xl":
      return [96, 96];
    case "2xl":
      return [64, 64];
    case "xl":
      return [48, 48];
    case "lg":
      return [40, 40];
    case "md":
      return [32, 32];
    case "s":
      return [24, 24];
    case "xs":
      return [20, 20];
    case "xxs":
      return [16, 16];

    default:
      return [32, 32];
  }
}

export function getAvatarSrc([w, h]: [number, number], src?: string) {
  if (!process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX || !src) {
    return src;
  }

  if (src?.includes(process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX)) {
    return src;
  }

  return `${process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX}width=${w * 2},height=${h * 2},fit=cover/${src}`;
}
