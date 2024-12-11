export interface ProjectBannerProps {
  title: string;
  subtitle: string;
  theme: "light" | "dark";
  image: string;
  backgroundColor: string;
  ctaPrimary: {
    label: string;
    href: string;
  };
  ctaSecondary: {
    label: string;
    href: string;
  };
}
