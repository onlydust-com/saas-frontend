import { Badge } from "@/design-system/atoms/badge";
import { Popover } from "@/design-system/atoms/popover";
import { Typo } from "@/design-system/atoms/typo";

import { LabelPopoverProps } from "./label-popover.types.";

export function LabelPopover({ labels, badgeProps }: LabelPopoverProps) {
  const labelCount = labels.length;

  if (!labelCount) return null;

  if (labelCount === 1) {
    return <Badge {...badgeProps}>{labels[0]}</Badge>;
  }

  return (
    <Popover>
      <Popover.Trigger>
        {() => (
          <div>
            <Badge {...badgeProps} classNames={{ base: "cursor-pointer", ...badgeProps?.classNames }}>
              {labels[0]} +{labelCount - 1}
            </Badge>
          </div>
        )}
      </Popover.Trigger>
      <Popover.Content>
        {() => (
          <ul className={"grid gap-3"}>
            {labels.map(label => (
              <Typo key={label} as={"li"} size={"sm"}>
                {label}
              </Typo>
            ))}
          </ul>
        )}
      </Popover.Content>
    </Popover>
  );
}
