export interface LanguagesProps {
  languages?: {
    id: string;
    name: string;
    percentage: number;
    logoUrl: string;
    color?: string;
    transparentLogoUrl?: string;
  }[];
}
