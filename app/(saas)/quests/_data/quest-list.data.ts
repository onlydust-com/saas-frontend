import { QuestList } from "../_features/quest-list/quest-list.types";

export const QuestListData: QuestList[] = [
  {
    id: "d4b5d8e1-c2a3-4f6b-9d8e-1c2a3f6b9d8e",
    bannerUrl: "https://pbs.twimg.com/profile_banners/1658760144077877250/1690476363/1500x500",
    projectId: "3123156c-020b-4d60-88c7-987f6572a37f",
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
        provided: [96808735],
        wanted: 1,
      },
      senior: {
        provided: [57687342],
        wanted: 1,
      },
      expert: {
        provided: [44169294],
        wanted: 1,
      },
    },
    requiredSkills: ["typescript", "react", "nextjs", "tailwind"],
    startDate: "2025-02-21",
    endDate: "2025-03-14",
    status: "finished",
    issues: [
      2806321584, 2806627562, 2806332637, 2806338443, 2806344209, 2806351482, 2806362495, 2806370780, 2806375535,
      2806384680, 2806400921, 2806389522, 2806598526, 2806622671, 2806634074, 2806638114, 2848782517, 2898176056,
      2815092182, 2815103166, 2815110545, 2815117114,
    ],
    maintainers: [144677881, 60229704],
  },
  {
    id: "f7a9c2b4-e6d8-4153-b9a7-2c8f5d3e91a0",
    bannerUrl: "https://www.starknet.africa/assets/bg.png",
    projectId: "5fbfb228-f82a-404b-8341-fe9ddcb4a041",
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
        provided: [28043077],
        wanted: 1,
      },
      senior: {
        provided: [92681651],
        wanted: 1,
      },
      expert: {
        provided: [171626566],
        wanted: 1,
      },
    },
    requiredSkills: ["typescript", "cairo", "graphql"],
    startDate: "2025-02-21",
    endDate: "2025-02-28",
    status: "finished",
    issues: [2852935797, 2852932988, 2852931887],
    maintainers: [112096641],
  },
  {
    id: "d8e47c3a-9f12-4b85-ae31-f59d76c24e08",
    bannerUrl: "https://develop-onlydust-app-images.s3.eu-west-1.amazonaws.com/scaffold-rust.png",
    projectId: "f903473e-9aa7-4fcc-9cc4-fec3a95149f9",
    projectSlug: "scaffold-rust",
    name: "Marketplace template with escrows",
    shortDescription:
      "This milestone involves building an end-to-end marketplace solution that integrates both the front end (user interface) and the back end (server and blockchain logic). The smart contracts, written in Soroban Rust, focus primarily on creating robust escrow mechanisms.",
    longDescription: {
      title: "Marketplace template with escrows",
      description:
        "This milestone involves building an end-to-end marketplace solution that integrates both the front end (user interface) and the back end (server and blockchain logic). The smart contracts, written in Soroban Rust, focus primarily on creating robust escrow mechanisms. In essence, this milestone lays the foundation for a secure, efficient, and trustworthy marketplace by combining a full stack template with smart, secure escrow contracts.",
      requirements: [
        "Full Stack Marketplace Template: Developing a complete template that covers everything from the user interface to the backend infrastructure.",
        "Smart Contracts in Soroban Rust: Implementing blockchain logic using Soroban, which leverages Rust's performance and safety.",
        "Escrow Functionality: Designing contracts that securely hold funds during transactions. Funds remain in escrow until all agreed conditions are met, ensuring both buyers and sellers are protected.",
      ],
      warning: "",
      links: ["https://github.com/ScaffoldRust/sr_Template_Marketplace/milestone/1"],
    },
    wantedProfiles: {
      junior: {
        provided: [127976766],
        wanted: 1,
      },
      senior: {
        provided: [544314, 75431447, 5597359],
        wanted: 3,
      },
    },
    requiredSkills: ["NextJS", "react", "Typescript", "Rust Soroban"],
    startDate: "2025-02-21",
    endDate: "2025-03-23",
    status: "started",
    issues: [
      2859601985, 2859618996, 2859636892, 2859652422, 2859661534, 2859664730, 2859669382, 2859671979, 2859676855,
      2859679876, 2859684383, 2859687863, 2859691488, 2859846586, 2859856778, 2859864192, 2859869833, 2859874502,
      2859880425, 2859893778, 2859899241, 2859904780, 2859911196, 2859917977, 2859924189, 2859929390, 2859933414,
      2859938837, 2859947763,
    ],
    maintainers: [174588862, 31634868, 176054645, 112297389],
  },
  {
    id: "c4f8d932-e517-4f1d-b6c9-a2b3e7d8f901",
    bannerUrl: "https://develop-onlydust-app-images.s3.eu-west-1.amazonaws.com/trustless-work-v6.png",
    projectId: "ae0c9b87-b67b-495f-bade-c94f52d14781",
    projectSlug: "trustless-work-",
    name: "Reclaim Protocol Attestations for Trustless Work Escrows",
    shortDescription:
      "Exploring how Reclaim Protocol can enable users to prove off-chain actions and integrate these attestations into Trustless Work’s escrow system.",
    longDescription: {
      title: "Reclaim Protocol Attestations for Trustless Work Escrows",
      description:
        "Exploring how Reclaim Protocol can enable users to prove off-chain actions and integrate these attestations into Trustless Work’s escrow system. The goal of this Spike is to research and prototype an integration between Reclaim Protocol and Trustless Work’s smart escrows. Reclaim enables users to generate verifiable proofs of off-chain actions (e.g., PayPal transactions, GitHub commits) that can be submitted and verified on-chain. This initiative will evaluate the feasibility of Reclaim attestations in Trustless Work’s escrow workflow. For example: (A Service Provider could prove that they committed the code, A User could prove that they sent a payment via PayPal, A P2P exchange participant could verify that an off-chain transaction was completed without exposing sensitive data). This Spike will determine:",
      requirements: [
        "How Reclaim Protocol generates proofs.",
        "How proofs are submitted to Soroban contracts.",
        "How Trustless Work’s escrow contracts can support these attestations.",
        "Potential roadmap for full integration.",
      ],
      warning: "",
      links: [],
    },
    wantedProfiles: {
      senior: {
        provided: [59573868],
        wanted: 1,
      },
      expert: {
        provided: [61715244],
        wanted: 1,
      },
    },
    requiredSkills: ["Blockchain researcher", "Smart contract developer (rust, soroban)", "Backend engineer"],
    startDate: "2025-02-21",
    endDate: "2025-03-14",
    status: "started",
    issues: [2864694007],
    maintainers: [13529612],
  },
  {
    id: "e7f2a159-d384-4c91-b8d5-f6e9c2a48b03",
    bannerUrl: "https://develop-onlydust-app-images.s3.eu-west-1.amazonaws.com/1500x500.jpeg",
    projectId: "3ffc746a-a879-40a5-91e0-b670d8d3dafc",
    projectSlug: "spotnet",
    name: "Building margin for trading",
    shortDescription:
      "We will build a smart contract for margin trading that enables users to apply leverage multipliers for both trading and spot markets.",
    longDescription: {
      title: "Building margin for trading",
      description:
        "This milestone builds a prototype for a future margin protocol smart contract using the Cairo language. You will build the following components and functions from scratch:",
      requirements: [
        "Trading Execution: The smart contract swaps USDC for the selected token to establish a trade position.",
        "Deposit Collateral: Users can deposit collateral into our smart contract.",
        "Risk Monitoring and Maintenance Margin: The system monitors prices to liquidate a position if prices drop or if interest rates accumulate.",
        "Risk Management: A notification system with a keeper bot closes positions when the health ratio falls below the threshold.",
        "Applying Leverage: A mechanism borrows funds from the treasury to open a position with a larger multiplier.",
      ],
      warning: "",
      links: [],
    },
    wantedProfiles: {
      senior: {
        provided: [135316445],
        wanted: 1,
      },
      expert: {
        provided: [177087057],
        wanted: 1,
      },
    },
    requiredSkills: ["Cairo"],
    startDate: "2025-02-25",
    endDate: "2025-03-21",
    status: "started",
    issues: [2866995946, 2866997140, 2866997973],
    maintainers: [19536159],
  },
  {
    id: "f8c47e9d-b3a5-4f16-8d92-3c7a1b94e5d0",
    bannerUrl: "https://pbs.twimg.com/profile_banners/1658760144077877250/1690476363/1500x500",
    projectId: "ed69beff-183c-4df2-afa3-22d4b4e6b44a",
    projectSlug: "lyricflip",
    name: "Mobile app foundational pages",
    shortDescription:
      "We have a couple of screens that goes midway into the screens we have on the mobile app version and we need the built rapidly by a group of 2 or 3 people. We want this build by a group because we want uniformity of appearance all over the app.",
    longDescription: {
      title: "Mobile app foundational pages",
      description:
        "We have a couple of screens that goes midway into the screens we have on the mobile app version and we need the built rapidly by a group of 2 or 3 people. We want this build by a group because we want uniformity of appearance all over the app.",
      warning: "",
      links: [],
    },
    wantedProfiles: {
      senior: {
        provided: [169891780, 86140439],
        wanted: 2,
      },
    },
    requiredSkills: ["react native", "expo", "UI", "typescript"],
    startDate: "2025-03-20",
    endDate: "2025-04-03",
    status: "finished",
    issues: [
      2926956496, 2926953702, 2926950585, 2926948727, 2926944633, 2926943128, 2926941803, 2926940839, 2926939730,
      2926937458, 2926933443, 2926929902, 2926925029, 2926921661,
    ],
    maintainers: [51526246],
  },
  {
    id: "c9d2e8f1-a4b6-4c7d-9e3f-2b5a8c6d4e0f",
    bannerUrl: "https://pbs.twimg.com/profile_banners/1658760144077877250/1690476363/1500x500",
    projectId: "12f9a106-470e-4047-ada6-4befb442783b",
    projectSlug: "gasless-gossip",
    name: "Production level Nestjs foundational issues",
    shortDescription:
      "Ready to dive deep into the guts of production-grade NestJS? Gasless Gossip is calling two mid-level NestJS & Postgres builders to tackle 20 real-world, foundational issues. This is a 5-day sprint, where speed, precision, and clean architecture matter. You'll be pairing directly with the project maintainer and get full-on support throughout the quest. We're looking for one man and one woman, because inclusion isn't optional - it's how we build better. Think you've got the skills and the speed? Join us, build fast, build smart, and leave your mark.",
    longDescription: {
      title: "Production level Nestjs foundational issues",
      description:
        "Ready to dive deep into the guts of production-grade NestJS? Gasless Gossip is calling two mid-level NestJS & Postgres builders to tackle 20 real-world, foundational issues. This is a 5-day sprint, where speed, precision, and clean architecture matter. You'll be pairing directly with the project maintainer and get full-on support throughout the quest. We're looking for one man and one woman, because inclusion isn't optional - it's how we build better. Think you've got the skills and the speed? Join us, build fast, build smart, and leave your mark.",
      warning: "Devs should be able to work along with the Maintainer and he will be available for them all the time.",
      links: [],
    },
    wantedProfiles: {
      senior: {
        provided: [119618121, 124844156],
        wanted: 2,
      },
    },
    requiredSkills: ["Nestjs", "Postgres"],
    startDate: "2025-02-21",
    endDate: "2025-02-28",
    status: "finished",
    issues: [
      2950247865, 2950251026, 2950271692, 2950274842, 2950280379, 2950296069, 2950298914, 2950301655, 2950305619,
      2950308280, 2950311753, 2950320592, 2950325436, 2950330425, 2950499071, 2950500811, 2950502705, 2950560078,
      2950564645, 2950566857, 2950570826, 2950573344, 2956183629, 2956188405, 2956194086, 2956199443, 2956208104,
      2956214061, 2956226296, 2956231680, 2956235381, 2956238682,
    ],
    maintainers: [51526246],
  },
  {
    id: "b5e9a2d1-f8c7-4e3a-9b5d-2f1e8c7d6b4a",
    bannerUrl: "https://pbs.twimg.com/profile_banners/1658760144077877250/1690476363/1500x500",
    projectId: "ed69beff-183c-4df2-afa3-22d4b4e6b44a",
    projectSlug: "lyricflip",
    name: "Full LMS backend with Nestjs",
    shortDescription:
      "Build a complete Learning Management System backend using NestJS and Postgres for LyricsFlip's music school platform.",
    longDescription: {
      title: "Full LMS backend with Nestjs",
      description:
        "LyricsFlip is leveling up. The vision? Evolve into a full-blown music school - and this ODQuest is the kickoff. Starting April 10, you'll join a 60-day build sprint to architect and ship a complete LMS backend using NestJS + Postgres. Real structure. Real logic. Real production-readiness.",
      requirements: [
        "Build a scalable NestJS backend architecture",
        "Implement robust database schema with Postgres",
        "Create comprehensive API endpoints for course management",
        "Develop user authentication and authorization system",
        "Implement file upload and management for course materials",
        "Create progress tracking and assessment features",
        "Build reporting and analytics functionality",
        "Ensure proper testing and documentation",
      ],
      warning:
        "You'll be working directly with the project maintainer who will be fully available throughout the quest.",
      links: [],
    },
    wantedProfiles: {
      senior: {
        provided: [],
        wanted: 2,
      },
    },
    requiredSkills: ["nestjs", "postgres", "typescript", "backend"],
    startDate: "2025-04-10",
    endDate: "2025-06-09",
    status: "application-open",
    issues: [],
    maintainers: [51526246],
  },
  {
    id: "a7d1c9b3-e5f2-4d8a-b6c9-1e3f2d8a4b7c",
    bannerUrl: "https://pbs.twimg.com/profile_banners/1658760144077877250/1690476363/1500x500",
    projectId: "ed69beff-183c-4df2-afa3-22d4b4e6b44a",
    projectSlug: "lyricflip",
    name: "Full LMS Frontend with Nextjs",
    shortDescription:
      "Build a modern, intuitive Learning Management System frontend using Next.js and modern UI frameworks for LyricsFlip's music school platform.",
    longDescription: {
      title: "Full LMS Frontend with Nextjs",
      description:
        "The LyricsFlip vision is growing - into a full-scale music school, and we're kicking it off on April 10 with a 60-day ODQuest to deliver a slick, intuitive, production-grade LMS frontend in Next.js. We're pulling in two mid-level frontend devs with serious Next.js skills - builders who know how to move fast without breaking things (or design systems). You'll be working directly with the project maintainer, who's got your back every step of the way. If clean UI, smart flows, and frontend finesse are your thing - this is your stage.",
      requirements: [
        "Build responsive and accessible UI components using Next.js and Tailwind",
        "Implement user authentication and authorization flows",
        "Create course browsing and enrollment interfaces",
        "Develop interactive lesson and content viewing components",
        "Build progress tracking and assessment interfaces",
        "Implement user profile and dashboard features",
        "Create admin interfaces for course management",
        "Ensure proper testing and documentation",
        "Optimize performance and loading states",
      ],
      warning:
        "Direct collaboration with the project maintainer throughout the quest is expected for maintaining design consistency and code quality.",
      links: [],
    },
    wantedProfiles: {
      senior: {
        provided: [],
        wanted: 2,
      },
    },
    requiredSkills: ["nextjs", "typescript", "tailwind", "react"],
    startDate: "2025-04-10",
    endDate: "2025-06-09",
    status: "application-open",
    issues: [],
    maintainers: [51526246],
  },
];

// https://api.github.com/repos/Trustless-Work/Trustless-Work-Smart-Escrow/issues/41
