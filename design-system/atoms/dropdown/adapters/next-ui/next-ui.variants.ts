import { tv } from "tailwind-variants";

export const DropdownNextUiVariants = tv({
  slots: {
    base: "group relative box-border flex h-fit w-fit cursor-pointer overflow-hidden rounded-lg bg-container-2 transition-colors",
    content: "flex w-full flex-row items-center justify-center bg-container-1",
  },
  variants: {},
  defaultVariants: {},
});
