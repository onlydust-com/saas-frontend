import { Project } from "@/core/domain/project/models/project-model";
import { ProjectStoragePort } from "@/core/domain/project/outputs/project-storage-port";
import { GetProjectByidResponse } from "@/core/domain/project/project-contract.types";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class ProjectClientAdapter implements ProjectStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getProjectById: "projects/:projectId",
  } as const;

  getProjectByid = ({ queryParams, pathParams }: FirstParameter<ProjectStoragePort["getProjectByid"]>) => {
    const path = this.routes["getProjectById"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetProjectByidResponse>({
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
}
