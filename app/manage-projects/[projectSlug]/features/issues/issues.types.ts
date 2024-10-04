export interface IssuesProps {
  projectId?: string;
}

export enum IssuesKanbanColumns {
  notAssigned = "notAssigned",
  inProgress = "inProgress",
  toReview = "toReview",
  done = "done",
  archive = "archive",
}
