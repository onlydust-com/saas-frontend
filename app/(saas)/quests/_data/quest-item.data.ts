import { QuestItem } from "../_components/quest-card/quest-card.types";

export const QuestItemData: QuestItem = {
  id: "1",
  projectSlug: "onlydust",
  name: "Implement auth in React frontend app",
  shortDescription:
    "Implement user authentication and authorization features in a React frontend application, including login, registration, and protected routes",
  longDescription:
    "We are looking for developers to help implement a comprehensive authentication and authorization system in our React frontend application. The key features include:\n\n- Building a secure login flow with OAuth integration\n- Creating a user registration system with email verification\n- Implementing protected routes and role-based access control\n- Adding session management and token handling\n- Setting up secure password reset functionality\n- Creating reusable auth-related components\n- Writing unit tests for auth flows\n\nYou will be working with TypeScript, React, Next.js and modern auth libraries. This is a great opportunity to gain hands-on experience with real-world authentication patterns and best practices.",
  issues: [2673631480, 2661455409, 2661271317, 2611038798],
  requiredSkills: ["typescript", "react", "nextjs", "oauth"],
  startDate: "2025-02-13",
  endDate: "2025-03-13",
  wantedProfiles: {
    junior: {
      provided: [16590657],
      wanted: 1,
    },
  },
  maintainers: [17259618],
};
