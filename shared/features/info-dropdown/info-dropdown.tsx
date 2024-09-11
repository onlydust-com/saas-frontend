"use client";

import { BoxSelect } from "lucide-react";

import { bootstrap } from "@/core/bootstrap";

import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Link } from "@/design-system/atoms/link";
import { Popover } from "@/design-system/atoms/popover";
import { Typo } from "@/design-system/atoms/typo";

import { TInfoDropdownProps } from "@/shared/features/info-dropdown/info-dropdown.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function InfoDropdown({ targetLabel, dropdownTitleToken, links }: TInfoDropdownProps) {
  const urlHelperPort = bootstrap.getUrlHelperPort();
  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div>
            <Badge as={"button"} color="grey" size="xs" endContent={<Icon component={BoxSelect} size={"sm"} />}>
              {targetLabel}
            </Badge>
          </div>
        )}
      </Popover.Trigger>
      <Popover.Content>
        {({ setIsOpen }) => (
          <div className={"grid gap-3"}>
            <div className={"flex items-center justify-between gap-3"}>
              <Typo size={"md"} translate={{ ...dropdownTitleToken }} />

              <Button variant={"secondary"} size={"sm"} onClick={() => setIsOpen(false)}>
                <Translate token={"v2.pages.hackathons.details.info.close"} />
              </Button>
            </div>

            {links.map(l => {
              if (l.url) {
                const validUrl = l.url ? urlHelperPort.validateUrl(l.url) : "";
                return (
                  <Link key={l.url} href={validUrl}>
                    {l.value ?? validUrl}
                  </Link>
                );
              }

              if (l.value) {
                return (
                  <Typo key={l.value} size={"xs"}>
                    {l.value}
                  </Typo>
                );
              }

              return null;
            })}
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
