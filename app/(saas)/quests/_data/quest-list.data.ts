import { QuestList } from "../_features/quest-list/quest-list.types";

export const QuestListData: QuestList[] = [
  {
    id: "d4b5d8e1-c2a3-4f6b-9d8e-1c2a3f6b9d8e",
    projectSlug: "starknet-quest",
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
    issues: [
      2806321584, 2806627562, 2806321584, 2806332637, 2806338443, 2806344209, 2806351482, 2806362495, 2806370780,
      2806375535, 2806384680, 2806400921, 2806389522, 2806598526, 2806622671, 2806634074, 2806638114,
    ],
    maintainers: [144677881],
  },
];
