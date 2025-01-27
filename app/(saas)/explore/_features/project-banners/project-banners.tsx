import { ThemedButton } from "@/app/(saas)/explore/_features/project-banners/_components/themed-button/themed-button";

import { bootstrap } from "@/core/bootstrap";

import { Typo } from "@/design-system/atoms/typo";

export function ProjectBanners() {
  const projectBannerAdapter = bootstrap.projectBannerStoragePortForClient;
  const [{ title, subtitle, theme, image, backgroundColor, ctas }] = projectBannerAdapter.getProjectBanners({});
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
          {ctas.map(cta => (
            <ThemedButton
              key={cta.label}
              bannerTheme={theme}
              as="a"
              htmlProps={{ href: cta.href }}
              variant={cta.variant}
              size="md"
            >
              {cta.label}
            </ThemedButton>
          ))}
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
