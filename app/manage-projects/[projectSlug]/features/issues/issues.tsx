import { IssuesProps } from "./issues.types";

export function Issues({ projectId }: IssuesProps) {
  return <div>{projectId}</div>;
}
