export interface NewProjectCardProps {
  logoUrl: string;
  name: string;
  description: string;
  categories: string[];
  languages: {
    logoUrl: string;
  }[];
  stars: number;
  forks: number;
  contributors: number;
  className?: string;
}
