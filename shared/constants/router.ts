export const NEXT_ROUTER = {
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
