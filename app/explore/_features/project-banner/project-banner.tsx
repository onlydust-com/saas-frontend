import { ThemedButton } from "@/app/explore/_features/project-banner/_components/themed-button/themed-button";
import { ProjectBannerProps } from "@/app/explore/_features/project-banner/project-banner.types";

import { Typo } from "@/design-system/atoms/typo";

export function ProjectBanner({
  title,
  subtitle,
  theme = "light",
  image,
  backgroundColor,
  ctaPrimary,
  ctaSecondary,
}: ProjectBannerProps) {
  const typoColor = theme === "dark" ? "black" : "white";

  return (
    <section className={"grid overflow-hidden rounded-2xl tablet:grid-cols-2"} style={{ backgroundColor }}>
      <div className="flex flex-col justify-between gap-3xl p-3xl">
        <div className="flex flex-col gap-sm">
          <Typo variant="heading" size="md" weight="medium" color={typoColor}>
            {title}
          </Typo>

          <Typo size="md" color={typoColor}>
            {subtitle}
          </Typo>
        </div>

        <div className="flex gap-lg">
          <ThemedButton bannerTheme={theme} as="a" htmlProps={{ href: ctaPrimary.href }} size="md">
            {ctaPrimary.label}
          </ThemedButton>

          <ThemedButton
            bannerTheme={theme}
            as="a"
            htmlProps={{ href: ctaSecondary.href }}
            size="md"
            variant="secondary"
          >
            {ctaSecondary.label}
          </ThemedButton>
        </div>
      </div>

      {image ? (
        <img
          src={image}
          alt={title}
          className="hidden max-h-[22rem] w-full object-cover tablet:block"
          loading="eager"
        />
      ) : null}
    </section>
  );
}
