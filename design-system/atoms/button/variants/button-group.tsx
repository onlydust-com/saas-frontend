import { tv } from "tailwind-variants";

import { cn } from "@/shared/helpers/cn";

import { ButtonGroupPort } from "../button.types";
import { Button } from "./button-default";

const ButtonGroupVariant = tv({
  slots: {
    base: "effect-box-shadow-xs flex flex-row overflow-hidden border-1 border-border-primary-alt",
  },
  variants: {
    size: {
      xs: {
        base: "rounded-sm",
      },
      sm: {
        base: "rounded-md",
      },
      md: {
        base: "rounded-md",
      },
      lg: {
        base: "rounded-lg",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

function ButtonItem({
  itemProps,
  commonProps,
  hasBorder,
  index,
}: {
  itemProps: ButtonGroupPort["buttons"][0];
  commonProps: ButtonGroupPort;
  index: number;
  hasBorder?: boolean;
}) {
  function handleClick() {
    if (commonProps.onClick) {
      commonProps.onClick(index);
    }

    if (itemProps.onClick) {
      itemProps.onClick();
    }
  }

  return (
    <Button
      {...commonProps}
      {...itemProps}
      onClick={handleClick}
      variant={"secondary"}
      classNames={{
        base: cn(
          "rounded-none !shadow-none border-r-0 border-t-0 border-r-0 border-b-0 border-border-primary-alt",
          {
            "border-l-0": !hasBorder,
          },
          commonProps.classNames?.base,
          itemProps.classNames?.base
        ),
      }}
    />
  );
}

export function ButtonGroup(props: ButtonGroupPort) {
  const { base } = ButtonGroupVariant({ size: props.size });
  return (
    <div className={base()}>
      {props.buttons.map((itemProps, index) => (
        <div key={index}>
          <ButtonItem itemProps={itemProps} commonProps={props} hasBorder={index !== 0} index={index} />
        </div>
      ))}
    </div>
  );
}
