import { Icon } from "@/design-system/atoms/icon";
import { RemixIconsName } from "@/design-system/atoms/icon/adapters/remix-icon/remix-icon-names.types";
import { Paper } from "@/design-system/atoms/paper";
import { Tag } from "@/design-system/atoms/tag";
import { Typo } from "@/design-system/atoms/typo";

import { SocialIconLink } from "@/shared/components/social-icon-link/social-icon-link";

import { ProjectOverviewProps } from "./project-overview.types";

export function ProjectOverview({ description, moreInfo, languages, categories }: ProjectOverviewProps) {
  return (
    <>
      <Paper size={"s"} container={"transparent"} classNames={{ base: "flex flex-col gap-3" }}>
        <Typo as={"div"} size={"s"} color={"text-2"}>
          {description}
        </Typo>
        {moreInfo?.length ? (
          <div className={"flex flex-col gap-1"}>
            {/*// TODO TRAD*/}
            <Typo as={"div"} size={"xs"} color={"text-2"}>
              Links
            </Typo>
            <div className={"flex flex-row flex-wrap gap-1"}>
              {moreInfo?.map(({ url, value }) => (
                <Tag
                  key={url}
                  size={"s"}
                  style={"outline"}
                  color={"white"}
                  as={"a"}
                  htmlProps={{ href: url }}
                  classNames={{ base: "max-w-full overflow-hidden" }}
                  startContent={<SocialIconLink url={url} />}
                >
                  {value}
                </Tag>
              ))}
            </div>
          </div>
        ) : null}
      </Paper>
      <Paper size={"s"} container={"transparent"} classNames={{ base: "flex flex-row gap-4" }}>
        <div className={"flex-1"}>PROJECT LEAD AND OTHER</div>
      </Paper>
      <div className={"flex w-full flex-row gap-4"}>
        {!!languages?.length && (
          <Paper size={"s"} container={"transparent"} classNames={{ base: "flex flex-col gap-2 flex-1" }}>
            <div className="flex flex-row gap-1">
              <Icon name={"ri-code-line"} />
              {/*// TODO TRAD*/}
              <Typo size={"xs"} weight={"medium"}>
                Language
              </Typo>
            </div>
            <div className={"flex flex-row flex-wrap gap-1"}>
              {languages?.map(({ logoUrl, name }) => (
                <Tag key={name} size={"s"} style={"outline"} color={"white"} avatar={{ src: logoUrl, alt: name }}>
                  {name}
                </Tag>
              ))}
            </div>
          </Paper>
        )}
        {!!categories?.length && (
          <Paper size={"s"} container={"transparent"} classNames={{ base: "flex flex-col gap-2 flex-1" }}>
            <div className="flex flex-row gap-1">
              <Icon name={"ri-price-tag-3-line"} />
              {/*// TODO TRAD*/}
              <Typo size={"xs"} weight={"medium"}>
                Categories
              </Typo>
            </div>
            <div className={"flex flex-row flex-wrap gap-1"}>
              {categories?.map(({ iconSlug, name }) => (
                <Tag
                  key={name}
                  size={"s"}
                  style={"outline"}
                  color={"white"}
                  icon={{ name: iconSlug as RemixIconsName }}
                >
                  {name}
                </Tag>
              ))}
            </div>
          </Paper>
        )}
      </div>
    </>
  );
}
