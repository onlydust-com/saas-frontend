import { IconPort, LucideIconPort, RemixIconPort } from "@/design-system/atoms/icon/icon.types";

export function isRemixIcon(icon: IconPort): icon is RemixIconPort {
  return (icon as RemixIconPort).name !== undefined;
}

export function isLucideIcon(icon: IconPort): icon is LucideIconPort {
  return (icon as LucideIconPort).component !== undefined;
}
