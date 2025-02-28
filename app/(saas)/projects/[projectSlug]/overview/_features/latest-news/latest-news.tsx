import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Megaphone, Target } from "lucide-react";
import { useEffect } from "react";

import { bootstrap } from "@/core/bootstrap";

import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Card } from "@/shared/ui/card";
import { TypographyMuted, TypographyP } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { useGetOdNews } from "../../../hooks/use-get-od-news";
import { LatestNewsProps } from "./latest-news.types";

export function LatestNews({ projectId, className }: LatestNewsProps) {
  const { data: odNews } = useGetOdNews({ projectId, limit: "1" });
  const dateKernelPort = bootstrap.getDateKernelPort();
  const { capture } = usePosthog();

  useEffect(() => {
    if (odNews?.length) {
      const _news = odNews[0];
      capture("project_latest_news_viewed", {
        projectId,
        newsId: _news.submissionId,
        lastUpdatedAt: _news.lastUpdatedAt,
      });
    }
  }, [odNews]);

  if (!odNews?.length) {
    return null;
  }

  const news = odNews[0];

  function renderNews() {
    if (!odNews?.length) {
      return null;
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <Card
          className={cn(
            "flex w-fit max-w-[450px] flex-col gap-4 border-black/80 bg-black/70 p-4 backdrop-blur-lg",
            className
          )}
        >
          <header className={"flex items-center justify-between gap-2"}>
            <div className={"flex items-center gap-2"}>
              {news.display.icon === "megaphone" ? (
                <Megaphone
                  className={cn("size-4", {
                    "text-indigo-500": news.display.color === "1",
                    "text-pink-500": news.display.color === "2",
                    "text-emerald-500": news.display.color === "3",
                  })}
                />
              ) : null}
              {news.display.icon === "calendar" ? (
                <Calendar
                  className={cn("size-4", {
                    "text-indigo-500": news.display.color === "1",
                    "text-pink-500": news.display.color === "2",
                    "text-emerald-500": news.display.color === "3",
                  })}
                />
              ) : null}
              {news.display.icon === "target" ? (
                <Target
                  className={cn("size-4", {
                    "text-indigo-500": news.display.color === "1",
                    "text-pink-500": news.display.color === "2",
                    "text-emerald-500": news.display.color === "3",
                  })}
                />
              ) : null}

              <TypographyP
                className={cn({
                  "text-indigo-500": news.display.color === "1",
                  "text-pink-500": news.display.color === "2",
                  "text-emerald-500": news.display.color === "3",
                })}
              >
                {news.display.title}
              </TypographyP>
            </div>
            <TypographyMuted>{dateKernelPort.formatDistanceToNow(new Date(news.lastUpdatedAt))}</TypographyMuted>
          </header>

          <TypographyP>{news.response.news}</TypographyP>
        </Card>
      </motion.div>
    );
  }

  return <AnimatePresence>{renderNews()}</AnimatePresence>;
}
