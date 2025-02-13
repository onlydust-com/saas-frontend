import { QuestList } from "../_features/quest-list/quest-list.types";

export const QuestListData: QuestList[] = [
  {
    id: "1",
    projectSlug: "onlydust",
    name: "Quiz Redesign",
    shortDescription:
      "Revamp the quiz interface to enhance user experience with updated design and improved navigation.",
    longDescription: {
      title: "Quiz Redesign",
      description: "Revamp the quiz interface to enhance user experience with updated design and improved navigation.",
      requirements: [
        "Only submit a pull request if assigned to this issue.",
        "Complete the task within 3 business days.",
        "In your PR description, include 'Close #[issue_id]' to close the issue.",
        "After submitting your PR, label it as 'ready for review'. Address any requested changes promptly and update the label back to 'ready for review' once done.",
        "Test your PR locally before pushing and ensure all tests and builds pass.",
      ],
      warning:
        "⚠️ Failure to follow these requirements may result in being added to the OnlyDust blacklist, affecting your eligibility for future rewards.",
      links: [
        "https://www.figma.com/design/fh0OAvj4AS08kHoSxu3DkE/%F0%9F%9A%80-Starknet-Quest?node-id=6837-7063&t=Ph0cLxeucMJgr0Q9-1",
      ],
    },
    wantedProfiles: {
      junior: {
        provided: [],
        wanted: 1,
      },
      expert: {
        provided: [16590657],
        wanted: 1,
      },
    },
    requiredSkills: ["typescript", "react", "nextjs", "oauth"],
    startDate: "2025-02-13",
    endDate: "2025-03-13",
    issues: [2673631480, 2661455409, 2661271317, 2611038798],
    maintainers: [17259618],
  },
];
