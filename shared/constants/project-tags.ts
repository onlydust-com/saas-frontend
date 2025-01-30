export enum PROJECT_TAG {
  BIG_WHALE = "BIG_WHALE",
  FAST_AND_FURIOUS = "FAST_AND_FURIOUS",
  HOT_COMMUNITY = "HOT_COMMUNITY",
  LIKELY_TO_REWARD = "LIKELY_TO_REWARD",
  NEWBIES_WELCOME = "NEWBIES_WELCOME",
  UPDATED_ROADMAP = "UPDATED_ROADMAP",
  WORK_IN_PROGRESS = "WORK_IN_PROGRESS",
  HAS_GOOD_FIRST_ISSUES = "HAS_GOOD_FIRST_ISSUES",
}

export type ProjectTagUnion = `${PROJECT_TAG}`;

export const PROJECT_TAG_METADATA: Record<
  PROJECT_TAG,
  { icon: { name?: string; custom?: string }; tooltip: string; label: string }
> = {
  [PROJECT_TAG.BIG_WHALE]: {
    // TODO @hayden add icon
    icon: { custom: "whale" },
    tooltip: "Project that has rewarded big",
    label: "Big whale",
  },
  [PROJECT_TAG.FAST_AND_FURIOUS]: {
    icon: { name: "ri-flashlight-fill" },
    tooltip: "Project that is moving fast with a lot of contributions completed",
    label: "Fast and furious",
  },
  [PROJECT_TAG.HOT_COMMUNITY]: {
    icon: { name: "ri-fire-line" },
    tooltip: "Project that has a high number of active contributors",
    label: "Hot community",
  },
  [PROJECT_TAG.LIKELY_TO_REWARD]: {
    icon: { name: "ri-hand-coin-line" },
    tooltip: "Project that can reward a work well done",
    label: "Likely to reward",
  },
  [PROJECT_TAG.NEWBIES_WELCOME]: {
    icon: { name: "ri-seedling-line" },
    tooltip: "Project that onboards new contributors regularly",
    label: "Newbies welcome",
  },
  [PROJECT_TAG.UPDATED_ROADMAP]: {
    icon: { name: "ri-git-fork-line" },
    tooltip: "Project that presents the most recent challenges",
    label: "Strong expertise required",
  },
  [PROJECT_TAG.WORK_IN_PROGRESS]: {
    icon: { name: "ri-hammer-line" },
    tooltip: "Project that has open issues ready to tackle",
    label: "Work in progress",
  },
  [PROJECT_TAG.HAS_GOOD_FIRST_ISSUES]: {
    icon: { name: "ri-thumb-up-line" },
    tooltip: "Project that has issues suitable for first-time contributors",
    label: "Issues available",
  },
} as const;
