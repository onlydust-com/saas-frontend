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
} as const;
