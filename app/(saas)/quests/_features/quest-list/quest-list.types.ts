export type profileLevel = "junior" | "senior" | "expert";

export type Issue = {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
};

export interface QuestList {
  id: string;
  projectSlug: string;
  name: string;
  shortDescription: string;
  requiredSkills: string[];
  startDate: string;
  endDate: string;
  wantedProfiles: {
    [key in profileLevel]?: {
      provided: number[];
      wanted: number;
    };
  };
}
