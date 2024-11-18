// TODO @hayden update this with core model
interface Repo {
  id: number;
  owner: string;
  name: string;
  description?: string;
  htmlUrl: string;
}

export interface ReposPopoverProps {
  repos: Repo[];
}
