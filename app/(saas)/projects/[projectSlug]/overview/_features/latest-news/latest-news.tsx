import { Calendar, Megaphone, Target, ThumbsUp } from "lucide-react";

import { Card } from "@/shared/ui/card";
import { TypographyP } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { useGetOdNews } from "../../../hooks/use-get-od-news";
import { LatestNewsProps } from "./latest-news.types";

export function LatestNews({ projectId }: LatestNewsProps) {
  const { data: odNews } = useGetOdNews({ projectId, limit: "1" });

  if (!odNews?.length) {
    return null;
  }

  const news = odNews[0];

  return (
    <Card
      className={cn("flex w-full flex-col gap-4 bg-stack p-4", {
        "border-orange-500": news.display.color === "orange",
        "border-purple-500": news.display.color === "purple",
        "border-blue-500": news.display.color === "blue",
      })}
    >
      <header className={"flex items-center gap-2"}>
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
      </header>

      <TypographyP>{news.response.news}</TypographyP>
    </Card>
  );
}
