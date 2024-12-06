import { tv } from "tailwind-variants";

export const ProjectCategoryCardDefaultVariants = tv({
  slots: {
    base: "flex h-40 w-40 flex-col items-center justify-center gap-3 rounded-lg p-4 transition-colors",
    icon: "text-inherit",
    name: "capitalize",
  },
  variants: {
    color: {
      cosmic_night: {
        base: "gradient-cosmic-night",
        icon: "text-inherit",
      },
      deep_ocean: {
        base: "gradient-deep-ocean",
        icon: "text-[#6DA0EF]",
      },
      velvet_dusk: {
        base: "gradient-velvet-dusk",
        icon: "text-[#CB6B9F]",
      },
      arctic_abyss: {
        base: "gradient-arctic-abyss",
        icon: "text-[#6AD09D]",
      },
      ember_shadow: {
        base: "gradient-ember-shadow",
        icon: "text-[#CDA142]",
      },
      mystic_twilight: {
        base: "gradient-mystic-twilight",
        icon: "text-[#8D79D7]",
      },
    },
  },
  defaultVariants: {
    color: "cosmic_night",
  },
});
