export const NEXT_ROUTER = {
  notFound: "/not-found",
  home: {
    root: "/",
  },
  programs: {
    root: "/programs",
    projects: {
      root: (id: string) => `/programs/${id}/projects`,
    },
    financial: {
      root: (id: string) => `/programs/${id}/financial`,
    },
  },
  financials: {
    root: "/financials",
    programs: {
      root: (id: string) => `/financials/${id}/programs`,
    },
    financial: {
      root: (id: string) => `/financials/${id}/financial`,
    },
  },
  manageProjects: {
    root: "/manage-projects",
    default: {
      root: (slug: string) => `/manage-projects/${slug}/contributions`,
    },
    contributions: {
      root: (slug: string) => `/manage-projects/${slug}/contributions`,
    },
    contributors: {
      root: (slug: string) => `/manage-projects/${slug}/contributors`,
    },
    financial: {
      root: (slug: string) => `/manage-projects/${slug}/financial`,
    },
  },
  createProject: {
    root: "/create-project",
    default: {
      root: () => "/create-project",
    },
  },
  myDashboard: {
    root: "/my-dashboard",
    contributions: {
      root: "/my-dashboard/contributions",
    },
    projects: {
      root: "/my-dashboard/projects",
    },
    rewards: {
      root: "/my-dashboard/rewards",
    },
  },
  data: {
    root: "/data",
    contributors: {
      root: "/data/contributors",
    },
    projects: {
      root: "/data/projects",
    },
    overview: {
      root: "/data/overview",
    },
  },
  splash: {
    githubCallback: "/github-callback",
  },
  projectRecommendation: {
    root: "/project-recommendation",
    results: {
      root: "/project-recommendation/results",
    },
  },
  projects: {
    root: "/projects",
    details: {
      root: (slug: string) => `/projects/${slug}`,
      overview: {
        root: (slug: string) => `/projects/${slug}/overview`,
      },
      issues: {
        root: (slug: string) => `/projects/${slug}/issues`,
      },
      contributors: {
        root: (slug: string) => `/projects/${slug}/contributors`,
      },
      rewards: {
        root: (slug: string) => `/projects/${slug}/rewards`,
      },
    },
  },
  osw: {
    root: "/osw",
    details: {
      root: (slug: string) => `/osw/${slug}`,
      overview: {
        root: (slug: string) => `/osw/${slug}/overview`,
      },
      projects: {
        root: (slug: string) => `/osw/${slug}/projects`,
      },
      community: {
        root: (slug: string) => `/osw/${slug}/community`,
      },
    },
  },
  repositories: {
    root: "/repositories",
    details: {
      root: (slug: string) => `/repositories/${slug}`,
      readme: {
        root: (slug: string) => `/repositories/${slug}/readme`,
      },
      issues: {
        root: (slug: string) => `/repositories/${slug}/issues`,
      },
    },
  },
  users: {
    root: "/users",
    details: {
      root: (userSlug: string) => `/users/${userSlug}`,
      overview: {
        root: (userSlug: string) => `/users/${userSlug}/overview`,
      },
      projects: {
        root: (userSlug: string) => `/users/${userSlug}/projects`,
      },
      analytics: {
        root: (userSlug: string) => `/users/${userSlug}/analytics`,
      },
    },
  },
  ecosystems: {
    root: "/ecosystems",
    details: {
      root: (ecosystemSlug: string) => `/ecosystems/${ecosystemSlug}`,
      overview: {
        root: (ecosystemSlug: string) => `/ecosystems/${ecosystemSlug}/overview`,
      },
      projects: {
        root: (ecosystemSlug: string) => `/ecosystems/${ecosystemSlug}/projects`,
      },
      community: {
        root: (ecosystemSlug: string) => `/ecosystems/${ecosystemSlug}/community`,
      },
    },
  },
  categories: {
    root: "/categories",
    details: {
      root: (categorySlug: string) => `/categories/${categorySlug}`,
    },
  },
  signup: {
    root: "/signup",
    termsAndConditions: {
      root: "/signup/terms-and-conditions",
    },
  },
  settings: {
    root: "/settings",
    profile: {
      root: "/settings/profile",
    },
    notifications: {
      root: "/settings/notifications",
    },
    payoutPreferences: {
      root: "/settings/payout-preferences",
    },
    billingProfiles: {
      root: "/settings/billing-profiles",
      generalInformation: {
        root: (slug: string) => `/settings/billing-profiles/${slug}/general-information`,
      },
      paymentMethods: {
        root: (slug: string) => `/settings/billing-profiles/${slug}/payment-methods`,
      },
      coworkers: {
        root: (slug: string) => `/settings/billing-profiles/${slug}/coworkers`,
      },
      invoices: {
        root: (slug: string) => `/settings/billing-profiles/${slug}/invoices`,
      },
    },
  },
  discover: {
    root: "/discover",
  },
} as const;

export const MARKETPLACE_ROUTER = {
  home: {
    all: "/",
  },
  projects: {
    all: "/projects",
    allWithParams: (params: { [key: string]: string }) => {
      const searchParams = new URLSearchParams(params);
      return `/projects?${searchParams.toString()}`;
    },
    details: {
      root: (slug: string) => `/p/${slug}`,
      contributors: (slug: string) => `/p/${slug}/contributors`,
      applications: {
        root: (slug: string) => `/p/${slug}/applications`,
        details: (slug: string, issueId: string) => `/p/${slug}/applications/${issueId}`,
      },
      rewards: {
        root: (slug: string) => `/p/${slug}/rewards`,
        new: (slug: string) => `/p/${slug}/rewards/new`,
      },
      edit: (slug: string) => `/p/${slug}/edit`,
      contributions: {
        root: (slug: string) => `/p/${slug}/contributions`,
      },
      insights: (slug: string) => `/p/${slug}/insights`,
    },
    creation: "/p/create",
  },
  contributions: {
    all: "/contributions",
  },
  applications: {
    all: "/applications",
  },
  rewards: {
    all: "/rewards",
  },
  settings: {
    all: "/settings",
    profile: "/settings/profile",
    payoutPreferences: "/settings/payout-preferences",
    billing: {
      root: (slug: string) => `/settings/billing/${slug}`,
      generalInformation: (slug: string) => `/settings/billing/${slug}/general-information`,
      paymentMethods: (slug: string) => `/settings/billing/${slug}/payment-methods`,
      coworkers: (slug: string) => `/settings/billing/${slug}/coworkers`,
      invoices: (slug: string) => `/settings/billing/${slug}/invoices`,
    },
  },
  publicProfile: {
    root: (githubLogin: string) => `/u/${githubLogin}`,
  },
  notFound: "/not-found",
  hackathons: {
    root: "/hackathons",
    details: {
      root: (slug: string) => `/hackathons/${slug}`,
    },
  },
  signup: {
    root: "/signup",
    onboarding: {
      root: "/signup/onboarding",
      projectRecommendations: "/signup/onboarding/project-recommendations",
      verifyInformation: "/signup/onboarding/verify-information",
      completeYourProfile: "/signup/onboarding/complete-your-profile",
      termsAndConditions: "/signup/onboarding/terms-and-conditions",
      payoutInformation: "/signup/onboarding/payout-information",
    },
  },
  legalNotice: {
    root: "/legal-notice",
  },
} as const;
