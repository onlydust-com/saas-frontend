import { Folder, User } from "lucide-react";
import { ElementType, useRef } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { HoverEffect } from "@/design-system/molecules/cards/card-project-marketplace/_components/hover-effect/hover-effect";

import { Stat } from "@/shared/components/stat/stat";
import { Languages } from "@/shared/features/projects/languages/languages";

import { EcosystemCardProps } from "./ecosystem-card.types";

export function EcosystemCard<C extends ElementType = "div">({
  as,
  htmlProps,
  name,
  logoUrl,
  usersCount = 0,
  projectsCount = 0,
  description,
  languages,
}: EcosystemCardProps<C>) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <Paper
      as={as}
      htmlProps={htmlProps}
      size="none"
      background="transparent"
      border="primary"
      classNames={{ base: "purple-halo-gradient relative z-[1] h-full rounded-md before:rounded-md after:rounded-md" }}
    >
      <div ref={cardRef} className="flex h-full w-full flex-col">
        <HoverEffect cardRef={cardRef} />

        <div className="relative z-20 flex h-full flex-col justify-between gap-2lg rounded-md border-border-primary p-xl">
          <div className="flex flex-col gap-2lg">
            <div className="flex flex-row items-center gap-xl">
              <Avatar size="xl" shape="squared" src={logoUrl} alt={name} />

              <Typo variant="heading" size="xs" weight="medium" color="primary" classNames={{ base: "truncate" }}>
                {name}
              </Typo>
            </div>

            <div className="flex flex-col gap-md mobile:flex-row">
              <Paper size="md" background="glass" border="primary">
                <Stat
                  label="Users"
                  value={Intl.NumberFormat().format(usersCount)}
                  iconProps={{
                    component: User,
                    classNames: {
                      base: "text-utility-secondary-yellow-500",
                    },
                  }}
                />
              </Paper>

              <Paper size="md" background="glass" border="primary">
                <Stat
                  label="Projects"
                  value={Intl.NumberFormat().format(projectsCount)}
                  iconProps={{
                    component: Folder,
                    classNames: {
                      base: "text-utility-secondary-blue-500",
                    },
                  }}
                />
              </Paper>
            </div>

            {description ? (
              <Typo size="sm" color="tertiary" classNames={{ base: "line-clamp-3" }}>
                {description}
              </Typo>
            ) : null}
          </div>

          <Languages languages={languages} />
        </div>
      </div>
    </Paper>
  );
}
