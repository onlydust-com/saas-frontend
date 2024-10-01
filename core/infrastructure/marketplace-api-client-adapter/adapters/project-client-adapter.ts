import { ProjectListItem } from "@/core/domain/project/models/project-list-item-model";
import { Project } from "@/core/domain/project/models/project-model";
import { ProjectStats } from "@/core/domain/project/models/project-stats-model";
import { ProjectStoragePort } from "@/core/domain/project/outputs/project-storage-port";
import {
  EditProjectBody,
  GetProjectByIdResponse,
  GetProjectStatsResponse,
  UploadProjectLogoResponse,
} from "@/core/domain/project/project-contract.types";
import { GetProjectsResponse } from "@/core/domain/project/project-contract.types";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class ProjectClientAdapter implements ProjectStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getProjectById: "projects/:projectId",
    getProjectStats: "projects/:projectId/stats",
    getProjects: "projects",
    editProject: "projects/:projectId",
    uploadProjectLogo: "projects/logos",
  } as const;

  getProjectById = ({ queryParams, pathParams }: FirstParameter<ProjectStoragePort["getProjectById"]>) => {
    const path = this.routes["getProjectById"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetProjectByIdResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return new Project(data);
    };

    return {
      request,
      tag,
    };
  };

  getProjectStats = ({ queryParams, pathParams }: FirstParameter<ProjectStoragePort["getProjectStats"]>) => {
    const path = this.routes["getProjectStats"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetProjectStatsResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return new ProjectStats(data);
    };

    return {
      request,
      tag,
    };
  };

  getProjects = ({ queryParams }: FirstParameter<ProjectStoragePort["getProjects"]>) => {
    const path = this.routes["getProjects"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      const data = await this.client.request<GetProjectsResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        projects: data.projects.map(project => new ProjectListItem(project)),
      };
    };

    return {
      request,
      tag,
    };
  };

  uploadProjectLogo = () => {
    const path = this.routes["uploadProjectLogo"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path });

    const request = async (body: File) =>
      this.client.request<UploadProjectLogoResponse>({
        path,
        method,
        tag,
        body,
        headers: {
          "Content-Type": body.type,
        },
      });

    return {
      request,
      tag,
    };
  };

  editProject = ({ pathParams }: FirstParameter<ProjectStoragePort["editProject"]>) => {
    const path = this.routes["editProject"];
    const method = "PUT";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: EditProjectBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        pathParams,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };
}
