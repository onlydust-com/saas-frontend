import { Meta, StoryObj } from "@storybook/react";

import { ProjectCategory } from "@/core/domain/project-category/models/project-category-model";

import { CardProjectCategoryLoading } from "./card-project-category.loading";
import { CardProjectCategoryPort } from "./card-project-category.types";
import { CardProjectCategory } from "./variants/card-project-category-default";

type Story = StoryObj<typeof CardProjectCategory>;

const mockCategory = new ProjectCategory({
  id: "1",
  name: "Ai",
  slug: "Ai",
  description: "Ai stuff",
  iconSlug: "ri-robot-line",
});

const colors: CardProjectCategoryPort<"div">["color"][] = [
  "cosmic_night",
  "deep_ocean",
  "velvet_dusk",
  "arctic_abyss",
  "ember_shadow",
  "mystic_twilight",
];

const meta: Meta<typeof CardProjectCategory> = {
  component: CardProjectCategory,
  title: "Molecules/Cards/ProjectCategory",
  tags: ["autodocs"],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: { code: "<ProjectCategoryCard />" },
    },
  },
  render: args => (
    <div className="w-[300px]">
      <CardProjectCategory {...args} category={mockCategory} />
    </div>
  ),
};

export const Colors: Story = {
  parameters: {
    docs: {
      source: { code: "<ProjectCategoryCard />" },
    },
  },
  render: args => (
    <div className="flex w-[300px] flex-col gap-4">
      {colors.map(color => (
        <CardProjectCategory key={color} {...args} category={mockCategory} color={color} />
      ))}
    </div>
  ),
};

export const Skeleton: Story = {
  parameters: {
    docs: {
      source: { code: "<ProjectCategoryCardLoading />" },
    },
  },
  render: () => {
    return (
      <div className="w-[300px]">
        <CardProjectCategoryLoading />
      </div>
    );
  },
};

export default meta;
