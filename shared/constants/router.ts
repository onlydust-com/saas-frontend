export const NEXT_ROUTER = {
  notFound: "/not-found",
  home: {
    root: "/",
  },
  programs: {
    root: "/programs",
    details: {
      root: (id: string) => `/programs/${id}`,
    },
  },
  financials: {
    root: "/financials",
    details: {
      root: (id: string) => `/financials/${id}`,
    },
  },
} as const;
