interface Repo {
  id: number;
  owner: string;
  name: string;
  description?: string;
}

export interface ReposPopoverProps {
  repos: Repo[];
}
