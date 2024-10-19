import { Loader } from "lucide-react";
import { InView } from "react-intersection-observer";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { cn } from "@/shared/helpers/cn";

import { KanbanColumnProps } from "./kanban-column.types";

export function KanbanColumn({ header, children, onNext, hasNextPage, isLoading }: KanbanColumnProps) {
  return (
    <div
      className={
        "flex h-[80vh] w-[70vw] min-w-[70vw] flex-col items-start justify-start gap-lg overflow-hidden rounded-md border-1 border-border-primary bg-background-primary-alt py-xl tablet:h-full tablet:w-[287px] tablet:min-w-[287px]"
      }
    >
      <div className={"flex h-fit w-full flex-row items-center justify-between gap-xs px-xl"}>
        {header?.startContent}
        <div className={"flex flex-row items-center justify-start gap-xs"}>
          <Typo size={"md"} weight={"medium"} as={"div"}>
            {header?.title}
          </Typo>
          {header.badge ? <Badge size={"xxs"} color={"grey"} shape={"rounded"} {...header.badge} /> : null}
        </div>
        {header?.endContent || <div />}
      </div>
      <ScrollView>
        <div className={"flex w-full flex-col items-start justify-start gap-lg px-xl"}>
          {children}
          {hasNextPage && !!onNext ? (
            <InView className={cn("flex w-full justify-center")} onChange={onNext} skip={isLoading}>
              <Button
                variant={"secondary"}
                size={"md"}
                onClick={onNext}
                isDisabled={isLoading}
                iconOnly={true}
                classNames={{ base: "w-full" }}
                startIcon={{ component: Loader }}
              />
            </InView>
          ) : null}
        </div>
      </ScrollView>
    </div>
  );
}
