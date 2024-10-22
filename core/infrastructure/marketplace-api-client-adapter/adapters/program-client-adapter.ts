import { ProgramListItem } from "@/core/domain/program/models/program-list-item-model";
import { Program } from "@/core/domain/program/models/program-model";
import { ProgramProjectListItem } from "@/core/domain/program/models/program-project-list-item-model";
import { ProgramProject } from "@/core/domain/program/models/program-project-model";
import { ProgramStoragePort } from "@/core/domain/program/outputs/program-storage-port";
import {
  EditProgramBody,
  GetProgramProjectResponse,
  GetProgramProjectsResponse,
  GetProgramResponse,
  GetProgramTransactionsResponse,
  GetProgramsResponse,
  GrantBudgetToProjectBody,
  UploadProgramLogoResponse,
} from "@/core/domain/program/program-contract.types";
import { TransactionListItem } from "@/core/domain/transaction/models/transaction-list-item-model";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class ProgramClientAdapter implements ProgramStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getPrograms: "me/programs",
    getProgramById: "programs/:programId",
    getProgramTransactions: "programs/:programId/transactions",
    getProgramTransactionsStats: "programs/:programId/stats/transactions",
    getProgramProjects: "programs/:programId/projects",
    grantBudgetToProject: "programs/:programId/grant",
    getProgramProject: "programs/:programId/projects/:projectId",
    uploadProgramLogo: "programs/logos",
    editProgram: "programs/:programId",
  } as const;

  getProgramById = ({ pathParams }: FirstParameter<ProgramStoragePort["getProgramById"]>) => {
    const path = this.routes["getProgramById"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = async () => {
      const data = await this.client.request<GetProgramResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new Program(data);
    };

    return {
      request,
      tag,
    };
  };

  getPrograms = ({ queryParams }: FirstParameter<ProgramStoragePort["getPrograms"]>) => {
    const path = this.routes["getPrograms"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      const data = await this.client.request<GetProgramsResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        programs: data.programs.map(program => new ProgramListItem(program)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getProgramTransactions = ({
    pathParams,
    queryParams,
  }: FirstParameter<ProgramStoragePort["getProgramTransactions"]>) => {
    const path = this.routes["getProgramTransactions"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<GetProgramTransactionsResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return {
        ...data,
        transactions: data.transactions.map(transaction => new TransactionListItem(transaction)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getProgramTransactionsCsv = ({
    pathParams,
    queryParams,
  }: FirstParameter<ProgramStoragePort["getProgramTransactionsCsv"]>) => {
    const path = this.routes["getProgramTransactions"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<Blob>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
        headers: {
          accept: "text/csv",
        },
      });

      return data;
    };

    return {
      request,
      tag,
    };
  };

  getProgramProjects = ({ pathParams, queryParams }: FirstParameter<ProgramStoragePort["getProgramProjects"]>) => {
    const path = this.routes["getProgramProjects"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<GetProgramProjectsResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return {
        ...data,
        projects: data.projects.map(project => new ProgramProjectListItem(project)),
      };
    };

    return {
      request,
      tag,
    };
  };

  grantBudgetToProject = ({ pathParams }: FirstParameter<ProgramStoragePort["grantBudgetToProject"]>) => {
    const path = this.routes["grantBudgetToProject"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: GrantBudgetToProjectBody) =>
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

  getProgramProject = ({ pathParams }: FirstParameter<ProgramStoragePort["getProgramProject"]>) => {
    const path = this.routes["getProgramProject"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = async () => {
      const data = await this.client.request<GetProgramProjectResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new ProgramProject(data);
    };

    return {
      request,
      tag,
    };
  };

  uploadProgramLogo = () => {
    const path = this.routes["uploadProgramLogo"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path });

    const request = async (body: File) =>
      this.client.request<UploadProgramLogoResponse>({
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

  editProgram = ({ pathParams }: FirstParameter<ProgramStoragePort["editProgram"]>) => {
    const path = this.routes["editProgram"];
    const method = "PUT";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: EditProgramBody) =>
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
