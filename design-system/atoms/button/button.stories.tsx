import { Meta, StoryObj } from "@storybook/react";
import { BoxSelect, CircleDashed, MessageCircleDashed } from "lucide-react";

import { ButtonLoading } from "@/design-system/atoms/button/button.loading";
import { isButtonSolid, isButtonText } from "@/design-system/atoms/button/button.utils";
import { ButtonGroup } from "@/design-system/atoms/button/variants/button-group";
import { Icon } from "@/design-system/atoms/icon";

import {
  ButtonPort,
  ButtonSize,
  ButtonSolidTheme,
  ButtonSolidVariant,
  ButtonTextPort,
  ButtonTextSize,
  ButtonTextVariant,
} from "./button.types";
import { Button } from "./variants/button-default";

type Story = StoryObj<typeof Button>;

const defaultProps: ButtonPort<"button"> = {
  children: "Button core",
  startIcon: { component: CircleDashed },
  endIcon: { component: CircleDashed },
  startContent: <Icon component={BoxSelect} size={"sm"} />,
  endContent: <Icon component={BoxSelect} size={"sm"} />,
};

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Atoms/Button",
  tags: ["autodocs"],
};

const FIGMA_URL = "https://www.figma.com/design/J3hcQznLabA7oR9zTBOZs2/Design-System-3.0?node-id=106-9827";
const sizes: ButtonSize[] = ["xs", "sm", "md", "lg"];
const variants: ButtonSolidVariant[] = ["primary", "secondary", "tertiary"];
const theme: ButtonSolidTheme[] = ["primary", "destructive"];

const sizesText: ButtonTextSize[] = ["xs", "md", "lg"];
const variantsText: ButtonTextVariant[] = ["primary", "secondary"];
const underlineVariant: [false, true] = [false, true];

function ButtonDoc(args: ButtonPort<"button"> & { isHover?: boolean; isFocus?: boolean }) {
  if (args.isHover) {
    // Storybook doesn't support data attributes in the preview
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Button {...defaultProps} {...args} htmlProps={{ "data-hover": "true" }} />;
  }

  if (args.isFocus) {
    // Storybook doesn't support data attributes in the preview
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Button {...defaultProps} {...args} htmlProps={{ "data-focus": "true" }} />;
  }

  if (isButtonText(args) && isButtonText(defaultProps)) {
    return <Button {...defaultProps} {...args} />;
  }

  if (isButtonSolid(args) && isButtonSolid(defaultProps)) {
    return <Button {...defaultProps} {...args} />;
  }

  return null;
}

const ButtonsDoc = ({ theme }: Pick<ButtonPort<"button">, "theme">) => (
  <div className="flex w-full flex-col items-start gap-10">
    {variants.map(variant => (
      <div key={variant} className="flex w-full items-start gap-5">
        {sizes.map(size => (
          <div className="flex flex-col gap-3" key={size}>
            <div className="flex w-full justify-between gap-3">
              <ButtonDoc theme={theme} size={size} variant={variant} />
              <ButtonDoc theme={theme} size={size} variant={variant} iconOnly={true} />
            </div>
            <div className="flex w-full justify-between gap-2">
              <ButtonDoc theme={theme} size={size} variant={variant} isHover={true} />
              <ButtonDoc theme={theme} size={size} variant={variant} iconOnly={true} isHover={true} />
            </div>
            <div className="flex w-full justify-between gap-2">
              <ButtonDoc theme={theme} size={size} variant={variant} isFocus={true} />
              <ButtonDoc theme={theme} size={size} variant={variant} iconOnly={true} isFocus={true} />
            </div>
            <div className="flex w-full justify-between gap-2">
              <ButtonDoc theme={theme} size={size} variant={variant} isDisabled={true} />
              <ButtonDoc theme={theme} size={size} variant={variant} iconOnly={true} isDisabled={true} />
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

const ButtonsTextDoc = (_: Pick<ButtonTextPort<"button">, "theme">) => (
  <div className="flex w-full flex-col items-start gap-10">
    {variantsText.map(variant =>
      underlineVariant.map(underline => (
        <div key={`${variant}-${underline}`} className="flex w-full items-start gap-5">
          {sizesText.map(size => (
            <div className="flex flex-col gap-3" key={size}>
              <div className="flex w-full justify-between gap-3">
                <ButtonDoc isTextButton={true} underline={underline} size={size} variant={variant} />
                <ButtonDoc isTextButton={true} underline={underline} size={size} variant={variant} iconOnly={true} />
              </div>
              <div className="flex w-full justify-between gap-2">
                <ButtonDoc isTextButton={true} underline={underline} size={size} variant={variant} isHover={true} />
                <ButtonDoc
                  isTextButton={true}
                  underline={underline}
                  size={size}
                  variant={variant}
                  iconOnly={true}
                  isHover={true}
                />
              </div>
              <div className="flex w-full justify-between gap-2">
                <ButtonDoc isTextButton={true} underline={underline} size={size} variant={variant} isFocus={true} />
                <ButtonDoc
                  isTextButton={true}
                  underline={underline}
                  size={size}
                  variant={variant}
                  iconOnly={true}
                  isFocus={true}
                />
              </div>
              <div className="flex w-full justify-between gap-2">
                <ButtonDoc isTextButton={true} underline={underline} size={size} variant={variant} isDisabled={true} />
                <ButtonDoc
                  isTextButton={true}
                  underline={underline}
                  size={size}
                  variant={variant}
                  iconOnly={true}
                  isDisabled={true}
                />
              </div>
            </div>
          ))}
        </div>
      ))
    )}
  </div>
);

export const Default: Story = {
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      source: {
        code: `
<Button startIcon={{component: Square}}>
  Button core
</Button>
        `,
      },
    },
  },
  render: args => {
    return (
      <Button
        {...{
          children: "Button core",
          startIcon: { component: CircleDashed },
          endIcon: { component: CircleDashed },
          startContent: <Icon component={BoxSelect} size={"sm"} />,
          endContent: <Icon component={BoxSelect} size={"sm"} />,
        }}
        {...args}
      />
    );
  },
};

export const PrimaryColor: Story = {
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      source: {
        code: `
<Button>
  Button core
</Button>
        `,
      },
    },
  },
  render: () => {
    return <ButtonsDoc theme={"primary"} />;
  },
};

export const DestructiveColor: Story = {
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      source: {
        code: `
<Button theme={"destructive"}>
  Button core
</Button>
        `,
      },
    },
  },
  render: () => {
    return <ButtonsDoc theme={"destructive"} />;
  },
};

export const TextButton: Story = {
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      source: {
        code: `
<Button isTextButton={true}>
  Button core
</Button>
        `,
      },
    },
  },
  render: () => {
    return <ButtonsTextDoc theme={"destructive"} />;
  },
};

export const Group: Story = {
  parameters: {
    docs: {
      source: { code: "<ButtonLoading  />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full flex-col items-start gap-10">
        {theme.map(theme => (
          <div key={theme} className="flex w-full flex-col items-start gap-5">
            {sizes.map(size => (
              <div key={size} className="flex w-full flex-col items-start gap-5">
                <ButtonGroup
                  theme={theme}
                  key={`primary-${size}`}
                  size={size}
                  buttons={[{ children: "Button 1" }, { children: "Button 2" }, { children: "Button 3" }]}
                />
                <ButtonGroup
                  theme={theme}
                  key={`primary-${size}`}
                  size={size}
                  buttons={[
                    { startIcon: { component: BoxSelect }, iconOnly: true },
                    { startIcon: { component: CircleDashed }, iconOnly: true },
                    { startIcon: { component: MessageCircleDashed }, iconOnly: true },
                  ]}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<ButtonLoading  />" },
    },
  },
  render: () => {
    return (
      <div className="flex w-full items-start gap-5">
        <div className="flex flex-col gap-2">
          <ButtonLoading size={"lg"} />
          <ButtonLoading size={"lg"} iconOnly />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonLoading size={"md"} />
          <ButtonLoading size={"md"} iconOnly />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonLoading size={"sm"} />
          <ButtonLoading size={"sm"} iconOnly />
        </div>
        <div className="flex flex-col gap-2">
          <ButtonLoading size={"xs"} />
          <ButtonLoading size={"xs"} iconOnly />
        </div>
      </div>
    );
  },
};

export default meta;
