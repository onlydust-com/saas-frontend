interface Repo {
  id: number;
  name: string;
  description?: string;
}

export interface ReposPopoverProps {
  repos: Repo[];
}
