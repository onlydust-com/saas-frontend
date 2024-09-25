import { IconPort, LucideIconPort, RemixIconPort } from "@/design-system/atoms/icon/icon.types";

export function isRemixIcon(icon: IconPort): icon is RemixIconPort {
  return "name" in icon;
}

export function isLucideIcon(icon: IconPort): icon is LucideIconPort {
  return "component" in icon;
}
