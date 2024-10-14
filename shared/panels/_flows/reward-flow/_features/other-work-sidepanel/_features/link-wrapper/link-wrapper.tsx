import { Link } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Icon } from "@/design-system/atoms/icon";
import { Input } from "@/design-system/atoms/input";
import { Tag } from "@/design-system/atoms/tag";
import { Typo } from "@/design-system/atoms/typo";

import { ContributionType, LinkWrapperProps } from "./link-wrapper.types";

// TODO: Ajouter button disabled footer + regex validation
export function LinkWrapper({}: LinkWrapperProps) {
  const { t } = useTranslation("panels");

  const [type, setType] = useState<ContributionType>("ISSUE");
  const [url, setUrl] = useState<string>("");

  function handleUrl(value: string) {
    setUrl(value);
  }

  return (
    <div className="flex flex-col gap-lg">
      <div className="flex flex-col gap-lg">
        <Typo
          size="xs"
          color="secondary"
          translate={{
            token: "panels:otherWork.link.select.label",
          }}
        />

        <div className="flex flex-wrap gap-md">
          <Tag
            size="xs"
            isSelected={type === "ISSUE"}
            onSelect={() => setType("ISSUE")}
            translate={{
              token: "panels:otherWork.link.select.items.issue",
            }}
          />

          <Tag
            size="xs"
            isSelected={type === "PULL_REQUEST"}
            onSelect={() => setType("PULL_REQUEST")}
            translate={{
              token: "panels:otherWork.link.select.items.pullRequest",
            }}
          />

          <Tag
            size="xs"
            isSelected={type === "CODE_REVIEW"}
            onSelect={() => setType("CODE_REVIEW")}
            translate={{
              token: "panels:otherWork.link.select.items.codeReview",
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-lg">
        <Typo
          size="xs"
          color="secondary"
          translate={{
            token: `panels:otherWork.link.url.${type}.label`,
          }}
        />

        <Input
          name="contributionUrl"
          value={url}
          size="sm"
          onChange={e => handleUrl(e.target.value)}
          endContent={<Icon component={Link} classNames={{ base: "text-foreground-quinary" }} />}
          placeholder={t(`otherWork.link.url.${type}.placeholder`)}
        />
      </div>
    </div>
  );
}
