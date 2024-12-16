import { Meta, StoryObj } from "@storybook/react";

import { CardProjectMarketplacePort } from "./card-project-marketplace.types";
import { CardProjectMarketplace } from "./variants/card-project-marketplace-default";

type Story = StoryObj<typeof CardProjectMarketplace>;

const defaultProps: CardProjectMarketplacePort<"div"> = {
  name: "Dojo",
  slug: "dojo",
  description:
    "Sin autem ad adulescentiam perduxissent, dirimi tamen interdum contentione vel uxoriae condicionis vel ",
  logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/566368398222658517.png",
  contributorCount: 10,
  starCount: 10,
  forkCount: 10,
  availableIssueCount: 10,
  goodFirstIssueCount: 5,
  categories: [
    { id: "defi", name: "DeFi" },
    { id: "nft", name: "NFT" },
  ],
  languages: [
    { id: "en", name: "English", percentage: 20 },
    { id: "fr", name: "French", percentage: 20 },
    { id: "es", name: "Spanish", percentage: 20 },
    { id: "de", name: "German", percentage: 15 },
    { id: "it", name: "Italian", percentage: 10 },
    { id: "pt", name: "Portuguese", percentage: 10 },
    { id: "nl", name: "Dutch", percentage: 5 },
  ],
};

const meta: Meta<typeof CardProjectMarketplace> = {
  component: CardProjectMarketplace,
  title: "Molecules/Cards/CardProjectMarketplace",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<CardProjectMarketplace />" },
    },
  },
  render: args => {
    return (
      <div className="flex w-full items-center gap-2">
        <CardProjectMarketplace {...defaultProps} {...args} />
      </div>
    );
  },
};

export default meta;
