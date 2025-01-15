import { CornerDownLeft, Folder, UserRound } from "lucide-react";

import { EcosystemReactQueryAdapter } from "@/core/application/react-query-adapter/ecosystem";

import { Avatar } from "@/design-system/atoms/avatar/variants/avatar-default";
import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { PaperLoading } from "@/design-system/atoms/paper/paper.loading";
import { Paper } from "@/design-system/atoms/paper/variants/paper-default";
import { Typo } from "@/design-system/atoms/typo/variants/typo-default";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { Languages } from "@/shared/features/projects/languages/languages";
import { Metric } from "@/shared/features/projects/metric/metric";
import { cn } from "@/shared/helpers/cn";

import { EcosystemSummaryProps } from "./ecosystem-summary.types";

export function EcosystemSummary({ ecosystemSlug }: EcosystemSummaryProps) {
  const {
    data: ecosystem,
    isLoading,
    isError,
  } = EcosystemReactQueryAdapter.client.useGetEcosystemBySlug({
    pathParams: {
      slug: ecosystemSlug,
    },
    options: {
      enabled: Boolean(ecosystemSlug),
    },
  });

  if (isLoading) {
    return <PaperLoading classNames={{ base: "h-[200px]" }} />;
  }

  if (isError || !ecosystem) return null;

  const { description, logoUrl, name, projectCount, contributorCount, languages, links } = ecosystem;

  return (
    <Paper background="glass" border="primary" size="none">
      <div className="flex flex-col divide-y divide-border-primary">
        <div className="flex flex-row gap-lg p-xl">
          <Avatar src={logoUrl ?? ""} alt={name} size="xl" shape="squared" />
          <div className="flex h-full flex-col justify-between overflow-hidden">
            <Typo variant="heading" size="xs" weight="medium" color="primary" classNames={{ base: "truncate" }}>
              {name}
            </Typo>

            <div className="flex items-center gap-md">
              <Metric icon={Folder} count={projectCount} />
              <Metric icon={UserRound} count={contributorCount} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-lg p-xl">
          <div className="flex flex-col gap-lg">
            {description ? (
              <div className="flex flex-col gap-sm">
                <Typo
                  size="xs"
                  weight="medium"
                  color="primary"
                  translate={{ token: "features:cardProjectOverview.description" }}
                />
                <Typo size="xs" color="primary" classNames={{ base: "line-clamp-3" }}>
                  {description}
                </Typo>
              </div>
            ) : null}
          </div>

          {languages?.length ? (
            <div className="flex flex-col gap-lg">
              <Typo
                size="xs"
                weight="medium"
                color="primary"
                translate={{ token: "features:cardProjectOverview.languages" }}
              />
              <Languages languages={languages} />
            </div>
          ) : null}

          {links.length > 0 ? (
            <div className="flex flex-col gap-lg">
              <Typo
                size="xs"
                weight="medium"
                color="primary"
                translate={{ token: "hackathon:details.summary.links" }}
              />

              <div className="grid gap-md mobile:grid-cols-2">
                {links.map((link, index) => {
                  const isFirst = index === 0;

                  const urlObject = new URL(link.url);
                  const domain = urlObject.hostname;

                  return (
                    <Paper
                      key={link.url}
                      as={BaseLink}
                      htmlProps={{ href: link.url }}
                      py="lg"
                      px="xl"
                      background={isFirst ? "transparent" : "secondary"}
                      border={isFirst ? "primary" : "none"}
                      classNames={{
                        base: cn("overflow-hidden", {
                          "purple-halo-gradient": isFirst,
                        }),
                      }}
                    >
                      <div className="relative z-[1] flex items-center gap-sm">
                        <div className="flex flex-1 flex-col gap-xl">
                          <Typo weight="medium" size="sm">
                            {link.value}
                          </Typo>

                          <Badge
                            size="xs"
                            shape="squared"
                            variant={isFirst ? "solid" : "outline"}
                            color={isFirst ? "brand" : "grey"}
                            classNames={{
                              base: "w-fit max-w-full",
                              label: "truncate",
                            }}
                          >
                            {domain}
                          </Badge>
                        </div>

                        <Icon component={CornerDownLeft} color="quaternary" />
                      </div>
                    </Paper>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Paper>
  );
}
