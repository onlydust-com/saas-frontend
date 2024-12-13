export interface components {
  schemas: {
    ProjectBannerResponse: {
      title: string;
      subtitle: string;
      theme: "light" | "dark";
      image: string;
      backgroundColor: string;
      ctas: {
        variant: "primary" | "secondary";
        label: string;
        href: string;
      }[];
    };
  };
}
