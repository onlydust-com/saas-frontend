import { tv } from "tailwind-variants";

import { cn } from "@/shared/helpers/cn";

import { Tooltip } from "../../tooltip";
import { ButtonGroupPort } from "../button.types";
import { Button } from "./button-default";

const ButtonGroupVariant = tv({
  slots: {
    base: "flex flex-row overflow-hidden border-1 border-border-primary-alt effect-box-shadow-xs",
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
  commonProps: Omit<ButtonGroupPort, "buttons">;
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

  function renderButton() {
    return (
      <Button
        {...commonProps}
        {...itemProps}
        onClick={handleClick}
        variant={"secondary"}
        classNames={{
          ...commonProps.classNames,
          ...itemProps.classNames,
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

  if (itemProps.tooltip) {
    return <Tooltip {...itemProps.tooltip}>{renderButton()}</Tooltip>;
  }

  return renderButton();
}

export function ButtonGroup({ buttons, ...commonProps }: ButtonGroupPort) {
  const { base } = ButtonGroupVariant({ size: commonProps.size });

  return (
    <div className={base()}>
      {buttons.map((itemProps, index) => (
        <div key={index}>
          <ButtonItem itemProps={itemProps} commonProps={commonProps} hasBorder={index !== 0} index={index} />
        </div>
      ))}
    </div>
  );
}
