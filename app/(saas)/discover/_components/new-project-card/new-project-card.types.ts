export interface NewProjectCardProps {
  logoUrl: string;
  name: string;
  description: string;
  categories: string[];
  languages: {
    name: string;
    logoUrl: string;
    percentage: number;
  }[];
  stars: number;
  forks: number;
  contributors: number;
  className?: string;
}
