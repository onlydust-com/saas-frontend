export interface Language {
  id: string;
  slug: string;
  name: string;
  logoUrl: string;
  transparentLogoUrl: string;
  bannerUrl: string;
  color: string;
  percentage: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconSlug: string;
  projectCount: number;
}

export interface Ecosystem {
  id: string;
  name: string;
  url: string;
  logoUrl: string;
  bannerUrl: string;
  slug: string;
  hidden: boolean;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  logoUrl: string;
  shortDescription: string;
  contributorCount: number;
  starCount: number;
  forkCount: number;
  availableIssueCount: number;
  goodFirstIssueCount: number;
  categories: Category[];
  tags: string[];
  languages: Language[];
  ecosystems: Ecosystem[];
  odHackStats: {
    issueCount: number;
    availableIssueCount: number;
  };
  contributorStats: {
    totalRewardedUsdAmount: number;
    mergedPrCount: number;
  };
}

export { useGetProjectsV2 } from "@/core/application/react-query-adapter/project/client/use-get-projects-v2"; 