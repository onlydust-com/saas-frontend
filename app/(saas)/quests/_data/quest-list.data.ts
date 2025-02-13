import { QuestList } from "../_features/quest-list/quest-list.types";

export const QuestListData: QuestList[] = [
  {
    id: "1",
    projectSlug: "onlydust",
    name: "Implement auth in React frontend app",
    shortDescription:
      "Implement user authentication and authorization features in a React frontend application, including login, registration, and protected routes",
    wantedProfiles: {
      junior: {
        provided: [],
        wanted: 1,
      },
      expert: {
        provided: [16590657],
        wanted: 4,
      },
    },
    requiredSkills: ["typescript", "react", "nextjs", "oauth"],
    startDate: "2025-02-13",
    endDate: "2025-03-13",
  },
  {
    id: "2",
    projectSlug: "onlydirt",
    name: "Quest 2",
    shortDescription: "Quest 2",
    wantedProfiles: {
      junior: {
        provided: [],
        wanted: 2,
      },
      senior: {
        provided: [],
        wanted: 3,
      },
      expert: {
        provided: [],
        wanted: 4,
      },
    },
    requiredSkills: ["skill-1", "skill-2", "skill-3"],
    startDate: "2025-02-20",
    endDate: "2025-02-29",
  },
  {
    id: "3",
    projectSlug: "onlyrust",
    name: "Quest 3",
    shortDescription: "Quest 3",
    wantedProfiles: {
      junior: {
        provided: [],
        wanted: 2,
      },
      senior: {
        provided: [],
        wanted: 3,
      },
      expert: {
        provided: [],
        wanted: 4,
      },
    },
    requiredSkills: ["skill-1", "skill-2", "skill-3"],
    startDate: "2025-03-01",
    endDate: "2025-04-01",
  },
];
