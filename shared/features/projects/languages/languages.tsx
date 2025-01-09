import { Plus } from "lucide-react";
import { useMemo } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";

import { LanguagesProps } from "./languages.types";

export function Languages({ languages = [] }: LanguagesProps) {
  const sortedLanguages = useMemo(() => languages.sort((a, b) => b.percentage - a.percentage), [languages]);

  const { main, other, otherPercent } = useMemo(() => {
    if (!sortedLanguages.length) return { main: [], other: [], otherPercent: 0 };

    if (sortedLanguages.length <= 2) {
      return {
        main: sortedLanguages,
        other: [],
        otherPercent: 0,
      };
    }

    const main = sortedLanguages.filter((lang, index) => index < 3 && lang.percentage > 20);
    const other = sortedLanguages.filter((lang, index) => index >= 3 || lang.percentage <= 20);
    const otherPercent = other.reduce((sum, lang) => sum + lang.percentage, 0) ?? 0;

    return { main, other, otherPercent };
  }, [sortedLanguages]);

  if (!sortedLanguages.length) return null;

  return (
    <Tooltip
      background="primary"
      content={
        <div className="flex flex-col gap-md">
          {sortedLanguages.map(language => (
            <div key={language.id} className="flex items-center justify-between gap-md">
              <div className="flex items-center gap-md">
                <Avatar src={language.logoUrl} alt={language.name} size="xxs" shape="squared" />

                <Typo size="xs" classNames={{ base: "text-inherit" }}>
                  {language.name}
                </Typo>
              </div>

              <Typo size="xs" color="quaternary">
                {language.percentage}%
              </Typo>
            </div>
          ))}
        </div>
      }
    >
      <div className="flex h-auto w-full gap-xs">
        <div className="flex h-auto flex-1 gap-xs">
          {main.map(language => (
            <div
              key={language.id}
              className="relative flex h-full min-w-fit items-center justify-between overflow-hidden"
              style={{
                width: `${language.percentage}%`,
              }}
            >
              <Badge
                key={language.id}
                color="brand"
                variant="outline"
                shape="rounded"
                size="xs"
                classNames={{
                  base: "border-none w-full bg-opacity-20",
                  content: "justify-between",
                }}
                avatar={{
                  src: language.logoUrl,
                  alt: language.name,
                }}
                styles={{
                  backgroundColor: language.color + "33", // 33 is 20% opacity
                  labelColor: language.color,
                }}
              >
                {`${language.percentage.toFixed(0)}%`}
              </Badge>
            </div>
          ))}

          {other?.length ? (
            <div
              className="min-w-fit"
              style={{
                width: `${otherPercent}%`,
              }}
            >
              <Badge
                color="grey"
                shape="rounded"
                size="xs"
                classNames={{ content: "justify-between" }}
                icon={{ component: Plus }}
              >
                {Math.ceil(otherPercent)}%
              </Badge>
            </div>
          ) : null}
        </div>
      </div>
    </Tooltip>
  );
}
