import { Accordion, AccordionItem } from "@nextui-org/react";
import { ChevronLeft, CircleDot, Clock } from "lucide-react";
import { ElementType } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Badge } from "@/design-system/atoms/badge";
import { ButtonGroup } from "@/design-system/atoms/button/variants/button-group";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";
import { CardContributionKanbanNextUiVariants } from "@/design-system/molecules/cards/card-contribution-kanban/adapters/next-ui/next-ui.variants";
import { CardContributionKanbanPort } from "@/design-system/molecules/cards/card-contribution-kanban/card-contribution-kanban.types";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";
import { ContributionInline } from "@/design-system/molecules/contribution-inline";

import { cn } from "@/shared/helpers/cn";

export function CardContributionKanbanNextUiAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  contribution,
  actions,
}: CardContributionKanbanPort<C>) {
  const Component = as || "div";
  const slots = CardContributionKanbanNextUiVariants();

  const dateKernelPort = bootstrap.getDateKernelPort();

  return (
    <Paper
      as={Component}
      {...htmlProps}
      classNames={{
        base: cn(slots.base(), classNames?.base),
      }}
      size={"lg"}
      background={"secondary"}
      border={"primary"}
    >
      <header className={"flex items-start justify-between gap-lg"}>
        <Typo size={"xs"} weight={"medium"}>
          {contribution.githubTitle}
        </Typo>

        <ContributionBadge contribution={contribution} />
      </header>

      <div className={"grid gap-xl"}>
        <div className={"flex items-center gap-md"}>
          <Typo size={"xs"} classNames={{ base: "flex gap-sm" }} color={"tertiary"}>
            <Icon component={Clock} />
            {dateKernelPort.formatDistanceToNow(new Date(contribution.lastUpdatedAt))}
          </Typo>

          <Badge color={"grey"} size={"xxs"}>
            Reward
          </Badge>
        </div>

        <div>
          <AvatarLabelGroup
            avatars={[
              {
                src: contribution.githubAuthor.avatarUrl,
              },
            ]}
            shape={"rounded"}
            size={"xs"}
            description={{ children: contribution.githubAuthor.login }}
          />
        </div>

        <div>
          <ContributionInline contribution={contribution} truncate />
        </div>

        <div>
          <Accordion showDivider={false} className={"p-0"}>
            <AccordionItem
              startContent={
                <Badge
                  color={"brand"}
                  size={"xxs"}
                  shape={"squared"}
                  icon={{ component: CircleDot, size: "xs" }}
                  iconOnly
                />
              }
              title={<Typo size={"xs"}>Issues linked</Typo>}
              indicator={<Icon component={ChevronLeft} classNames={{ base: "text-components-badge-brand-fg" }} />}
              classNames={{
                base: "px-0",
                heading: "",
                trigger: "p-0 gap-xs",
                titleWrapper: "",
                title: "bg-blue-500",
                subtitle: "",
                startContent: "",
                indicator: "",
                content: "py-0",
              }}
            >
              <div className="relative pl-3xl pt-lg">
                <div className="absolute -top-1 bottom-0 left-2.5 w-px bg-components-badge-brand-border" />
                <ul className={"grid gap-sm"}>
                  <li>
                    <ContributionInline contribution={contribution} truncate />
                  </li>
                  <li>
                    <ContributionInline contribution={contribution} truncate />
                  </li>
                  <li>
                    <ContributionInline contribution={contribution} truncate />
                  </li>
                </ul>
              </div>
            </AccordionItem>
          </Accordion>
        </div>

        <footer className={"flex justify-between gap-lg"}>
          <Badge color={"grey"} size={"xs"}>
            Label
          </Badge>

          {actions ? <ButtonGroup buttons={actions} size={"xs"} /> : null}
        </footer>
      </div>
    </Paper>
  );
}
