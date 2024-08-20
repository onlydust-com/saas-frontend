import { TagPort } from "@/design-system/atoms/tag";

interface language {
  logoUrl: string;
  name: string;
}

export interface LanguageGroupProps {
  languages: language[];
  maxLanguages?: number;
  maxLanguagesAvatar?: number;
  className?: string;
  tagProps?: TagPort<"div">;
}
