import { Meta, StoryObj } from "@storybook/react";

import { ProjectCategory } from "@/core/domain/project-category/models/project-category-model";

import { ProjectCategoryCardLoading } from "./project-category.loading";
import { ProjectCategoryCardPort } from "./project-category.types";
import { ProjectCategoryCard } from "./variants/project-category-card-default";

type Story = StoryObj<typeof ProjectCategoryCard>;

const mockCategory = new ProjectCategory({
  id: "1",
  name: "Ai",
  slug: "Ai",
  description: "Ai stuff",
  iconSlug: "ri-robot-line",
});

const colors: ProjectCategoryCardPort<"div">["color"][] = [
  "cosmic_night",
  "deep_ocean",
  "velvet_dusk",
  "arctic_abyss",
  "ember_shadow",
  "mystic_twilight",
];

const meta: Meta<typeof ProjectCategoryCard> = {
  component: ProjectCategoryCard,
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
      <ProjectCategoryCard {...args} category={mockCategory} />
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
        <ProjectCategoryCard key={color} {...args} category={mockCategory} color={color} />
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
        <ProjectCategoryCardLoading />
      </div>
    );
  },
};

export default meta;
