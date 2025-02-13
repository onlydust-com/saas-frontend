export type ProjectCardProps = {
  name: string;
  description: string;
  slug: string;
  logoUrl: string;
  categories: string[];
  languages: { name: string; logoUrl: string; percentage: number }[];
  onClick?: () => void;
};
