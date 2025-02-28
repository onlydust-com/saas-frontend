import { Calendar, Megaphone, Target, ThumbsUp } from "lucide-react";

import { bootstrap } from "@/core/bootstrap";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Card } from "@/shared/ui/card";
import { TypographyMuted, TypographyP } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { useGetOdNews } from "../../../hooks/use-get-od-news";
import { LatestNewsProps } from "./latest-news.types";

export function LatestNews({ projectId }: LatestNewsProps) {
  const { data: odNews } = useGetOdNews({ projectId, limit: "1" });
  const dateKernelPort = bootstrap.getDateKernelPort();
  if (!odNews?.length) {
    return null;
  }

  const news = odNews[0];

  console.log("news", news);

  return (
    <Card
      className={cn("flex w-full flex-col gap-4 bg-stack p-4", {
        "border-orange-500": news.display.color === "orange",
        "border-purple-500": news.display.color === "purple",
        "border-blue-500": news.display.color === "blue",
      })}
    >
      <header className={"flex items-center justify-between gap-2"}>
        <div className={"flex items-center gap-2"}>
          {news.display.icon === "megaphone" ? (
            <Megaphone
              className={cn("size-4", {
                "text-orange-500": news.display.color === "orange",
                "text-purple-500": news.display.color === "purple",
                "text-blue-500": news.display.color === "blue",
              })}
            />
          ) : null}
          {news.display.icon === "calendar" ? (
            <Calendar
              className={cn("size-4", {
                "text-orange-500": news.display.color === "orange",
                "text-purple-500": news.display.color === "purple",
                "text-blue-500": news.display.color === "blue",
              })}
            />
          ) : null}
          {news.display.icon === "target" ? (
            <Target
              className={cn("size-4", {
                "text-orange-500": news.display.color === "orange",
                "text-purple-500": news.display.color === "purple",
                "text-blue-500": news.display.color === "blue",
              })}
            />
          ) : null}

          <TypographyP
            className={cn({
              "text-orange-500": news.display.color === "orange",
              "text-purple-500": news.display.color === "purple",
              "text-blue-500": news.display.color === "blue",
            })}
          >
            {news.display.title}
          </TypographyP>
        </div>
        <TypographyMuted>{dateKernelPort.formatDistanceToNow(new Date(news.lastUpdatedAt))}</TypographyMuted>
      </header>

      <TypographyP>{news.response.news}</TypographyP>

      <div className="flex flex-row gap-2 pb-2 pt-6">
        <Avatar>
          <AvatarImage src={news.paramaters.createdByAvatar ?? ""} />
          <AvatarFallback>{news.paramaters.createdByLogin?.[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-px">
          <TypographyMuted>Created by</TypographyMuted>
          <TypographyP>{news.paramaters.createdByLogin}</TypographyP>
        </div>
      </div>
    </Card>
  );
}
