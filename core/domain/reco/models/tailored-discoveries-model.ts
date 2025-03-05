import { Issue, IssueInterface } from "@/core/domain/issue/models/issue-model";
import { ProjectListItemInterfaceV2, ProjectListItemV2 } from "@/core/domain/project/models/project-list-item-model-v2";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type TailoredDiscoveriesResponse = components["schemas"]["TailoredDiscoveriesResponse"];

export interface TailoredDiscoveriesInterface extends TailoredDiscoveriesResponse {
  sections: TailoredDiscoveriesSectionInterface[];
}

export class TailoredDiscoveries implements TailoredDiscoveriesInterface {
  hasSufficientData!: TailoredDiscoveriesResponse["hasSufficientData"];
  sections!: TailoredDiscoveriesSectionInterface[];

  constructor(props: TailoredDiscoveriesResponse) {
    Object.assign(this, props);
    this.sections = this.sections.map(section => new TailoredDiscoveriesSection(section));
  }
}

export type TailoredDiscoveriesSectionResponse = components["schemas"]["TailoredDiscoveriesSectionResponse"];

export interface TailoredDiscoveriesSectionInterface extends TailoredDiscoveriesSectionResponse {
  projects: ProjectListItemInterfaceV2[];
  issues: IssueInterface[];
  getResourceType(): "project" | "issue";
  getProjects(): ProjectListItemInterfaceV2[];
  getIssues(): IssueInterface[];
}

class TailoredDiscoveriesSection implements TailoredDiscoveriesSectionInterface {
  title!: string;
  subtitle!: string;
  projects!: ProjectListItemInterfaceV2[];
  issues!: IssueInterface[];

  constructor(props: TailoredDiscoveriesSectionResponse) {
    Object.assign(this, props);
    this.projects = props.projects.map(project => new ProjectListItemV2(project));
    this.issues = props.issues.map(issue => new Issue(issue));
  }

  private resourceTypeProject = "project" as const;
  private resourceTypeIssue = "issue" as const;

  getResourceType() {
    if (this.projects.length > 0) {
      return this.resourceTypeProject;
    }

    return this.resourceTypeIssue;
  }

  getProjects() {
    return this.getResourceType() === this.resourceTypeProject ? this.projects : [];
  }

  getIssues() {
    return this.getResourceType() === this.resourceTypeIssue ? this.issues : [];
  }
}
