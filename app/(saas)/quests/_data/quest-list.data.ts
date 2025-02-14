import { QuestList } from "../_features/quest-list/quest-list.types";

export const QuestListData: QuestList[] = [
  {
    id: "d4b5d8e1-c2a3-4f6b-9d8e-1c2a3f6b9d8e",
    bannerUrl: "https://pbs.twimg.com/profile_banners/1658760144077877250/1690476363/1500x500",
    projectSlug: "starknet-quest",
    name: "Quiz Redesign",
    shortDescription:
      "Revamp the quiz interface to enhance user experience with updated design and improved navigation.",
    longDescription: {
      title: "Quiz Redesign",
      description: "Revamp the quiz interface to enhance user experience with updated design and improved navigation.",
      requirements: [
        "Only submit a pull request if assigned to this issue.",
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
      senior: {
        provided: [],
        wanted: 1,
      },
      expert: {
        provided: [],
        wanted: 1,
      },
    },
    requiredSkills: ["typescript", "react", "nextjs", "tailwind"],
    startDate: "2025-02-21",
    endDate: "2025-03-14",
    issues: [
      2806321584, 2806627562, 2806321584, 2806332637, 2806338443, 2806344209, 2806351482, 2806362495, 2806370780,
      2806375535, 2806384680, 2806400921, 2806389522, 2806598526, 2806622671, 2806634074, 2806638114,
    ],
    maintainers: [144677881, 60229704],
  },
  {
    id: "f7a9c2b4-e6d8-4153-b9a7-2c8f5d3e91a0",
    bannerUrl: "https://www.starknet.africa/assets/bg.png",
    projectSlug: "attensys",
    name: "Integrating the graph into attensys in Attensys explorer",
    shortDescription:
      "We need to integrate The Graph Protocol to index and query events emitted by the AttenSysOrg Contract and the AttenSys Event Contract within the AttenSys Explorer.",
    longDescription: {
      title: "Integrating the graph into attensys in Attensys explorer",
      description:
        "We need to integrate The Graph Protocol to index and query events emitted by the AttenSysOrg Contract and the AttenSys Event Contract within the AttenSys Explorer. This will allow us to efficiently track and display key events such as organization creation, event registrations, attendance tracking, and certificate issuance. The integration will enable real-time querying of blockchain data, improving the explorer&apos; performance and user experience.",
      requirements: [
        "a. Set up subgraph for Attensys Org",
        "Set up a subgraph to index relevant events from both contracts.",
        "Define the GraphQL schema for querying the indexed data.",
        "Deploy the subgraph and ensure it correctly captures emitted events.",
        "Integrate the indexed data into the AttenSys Explorer frontend.",
        "b. Set up subgraph for Attensys Course",
        "Set up a subgraph to index relevant events from both contracts.",
        "Define the GraphQL schema for querying the indexed data.",
        "Deploy the subgraph and ensure it correctly captures emitted events.",
        "Integrate the indexed data into the AttenSys Explorer frontend.",
      ],
      warning: "",
      links: ["https://thegraph.com/docs/en/"],
    },
    wantedProfiles: {
      junior: {
        provided: [],
        wanted: 1,
      },
      senior: {
        provided: [],
        wanted: 1,
      },
      expert: {
        provided: [],
        wanted: 1,
      },
    },
    requiredSkills: ["typescript", "cairo", "graphql"],
    startDate: "2025-02-21",
    endDate: "2025-02-28",
    issues: [2852935797, 2852932988, 2852931887],
    maintainers: [112096641],
  },
];
