import { tv } from "tailwind-variants";

export const ThemedButtonVariants = tv({
  slots: {
    base: "border-none",
  },

  variants: {
    variant: {
      primary: {
        base: "",
      },
      secondary: {
        base: "bg-opacity-10 data-[hover=true]:bg-opacity-10 hover:bg-opacity-10",
      },
      tertiary: {
        base: "",
      },
    },
    bannerTheme: {
      light: {
        base: "bg-white data-[hover=true]:bg-white hover:bg-white",
      },
      dark: {
        base: "bg-black data-[hover=true]:bg-black hover:bg-black",
      },
    },
  },

  compoundVariants: [
    {
      bannerTheme: "light",
      variant: "primary",
      class: {
        base: "text-black",
      },
    },
    {
      bannerTheme: "light",
      variant: "secondary",
      class: {
        base: "text-white",
      },
    },
    {
      bannerTheme: "dark",
      variant: "primary",
      class: {
        base: "text-white",
      },
    },
    {
      bannerTheme: "dark",
      variant: "secondary",
      class: {
        base: "text-black",
      },
    },
  ],
});
