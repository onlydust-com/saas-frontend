import { Meta, StoryObj } from "@storybook/react";
import { Square } from "lucide-react";

import { Icon } from "@/design-system/atoms/icon";

import { ButtonPort } from "./button.types";
import { Button } from "./variants/button-default";

type Story = StoryObj<typeof Button>;

const defaultProps: ButtonPort<"button"> = {
  children: "Button core",
  startIcon: { component: Square },
  endIcon: { component: Square },
  startContent: <Icon component={Square} size={"sm"} />,
  endContent: <Icon component={Square} size={"sm"} />,
};

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Atoms/Button",
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#05051E" }],
    },
  },
};

export const Default: Story = {
  render: args => {
    return <Button {...defaultProps} endContent={undefined} startContent={undefined} endIcon={undefined} {...args} />;
  },
};

export const Size: Story = {
  parameters: {
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
      <div className="flex w-full items-start gap-5">
        <div className="flex flex-col gap-2">
          <Button {...defaultProps} {...args} size={"xs"} />
        </div>
        <div className="flex flex-col gap-2">
          <Button {...defaultProps} {...args} size={"sm"} />
        </div>
        <div className="flex flex-col gap-2">
          <Button {...defaultProps} {...args} />
        </div>
        <div className="flex flex-col gap-2">
          <Button {...defaultProps} {...args} size={"lg"} />
        </div>
      </div>
    );
  },
};

// export const Skeleton: Story = {
//   parameters: {
//     docs: {
//       source: { code: "<ButtonLoading  />" },
//     },
//   },
//   render: () => {
//     return (
//       <div className="flex w-full items-start gap-5">
//         <div className="flex flex-col gap-2">
//           <ButtonLoading size={"xl"} />
//           <ButtonLoading size={"xl"} hideText />
//         </div>
//         <div className="flex flex-col gap-2">
//           <ButtonLoading size={"l"} />
//           <ButtonLoading size={"l"} hideText />
//         </div>
//         <div className="flex flex-col gap-2">
//           <ButtonLoading />
//           <ButtonLoading hideText />
//         </div>
//         <div className="flex flex-col gap-2">
//           <ButtonLoading size={"s"} />
//           <ButtonLoading size={"s"} hideText />
//         </div>
//       </div>
//     );
//   },
// };

export default meta;
