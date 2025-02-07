import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren, createContext, useCallback, useEffect, useRef, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { GithubReactQueryAdapter } from "@/core/application/react-query-adapter/github";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { GetMyOrganizationsResponse } from "@/core/domain/github/github-contract.types";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { usePooling, usePoolingFeedback } from "@/shared/hooks/pooling/usePooling";
import { rewardsSettingsTypes } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.types";

import { ProjectCreationSteps, ProjectCreationStepsNext, ProjectCreationStepsPrev } from "./types/ProjectCreationSteps";
import { CreateFormData } from "./types/ProjectCreationType";
import { onSyncOrganizations } from "./utils/syncOrganization";

/**
 * @interface CreateContextProps
 * @property {CreateFormData | undefined} initialProject - Initial project data.
 * @property {ProjectCreationSteps | undefined} initialStep - Initial step in project creation.
 * @property {React.ReactNode} children - React components.
 */
type CreateProject = {
  form: UseFormReturn<CreateFormData, unknown>;
  currentStep: ProjectCreationSteps;
  organizations: GetMyOrganizationsResponse;
  organizationsLoading: boolean;
  isSubmitting: boolean;
  PoolingFeedback: React.ReactElement;
  formFn: {
    addRepository: (data: number) => void;
    removeRepository: (data: number) => void;
  };
  helpers: {
    goTo: (step: ProjectCreationSteps) => void;
    next: () => void;
    prev: () => void;
  };
};

export const CreateProjectContext = createContext<CreateProject>({
  form: {} as UseFormReturn<CreateFormData, unknown>,
  currentStep: ProjectCreationSteps.ORGANIZATIONS,
  organizations: [],
  organizationsLoading: false,
  isSubmitting: false,
  PoolingFeedback: <></>,
  helpers: {
    goTo: () => null,
    next: () => null,
    prev: () => null,
  },
  formFn: {
    addRepository: () => null,
    removeRepository: () => null,
  },
});

const validationSchema = z.object({
  logoUrl: z.string().optional(),
  projectLeads: z.array(z.object({ id: z.string() })).optional(),
  isLookingForContributors: z.boolean().nullish().optional(),
  longDescription: z.string().min(1),
  ecosystems: z.array(z.object({ id: z.number().or(z.string()) })).optional(),
  projectCategories: z.array(z.object({ id: z.number().or(z.string()) })).optional(),
  categorySuggestions: z.array(z.string()).optional(),
  moreInfos: z
    .array(
      z
        .object({
          url: z.string().trim().nullable(),
          value: z.string().nullable(),
        })
        .refine(data => !!data.url || (!data.url && !data.value) || (!!data.url && !!data.value), {
          path: ["url"],
          // not translated because it's not used in a react component
          message: "Please fill the information url",
        })
    )
    .min(0)
    .optional()
    .nullable(),
  name: z.string().min(1),
  shortDescription: z.string().min(1),
});

export function CreateProjectProvider({ children }: PropsWithChildren) {
  const backgroundRef = useRef<HTMLFormElement | null>(null);

  const router = useRouter();
  const { user } = useAuthUser();
  const [currentStep, setCurrentStep] = useState<ProjectCreationSteps>(ProjectCreationSteps.ORGANIZATIONS);
  const searchParams = useSearchParams();
  const installation_id = searchParams.get("installation_id") ?? "";

  // Polling the organizations every second knowing that user can delete and installation
  // and the related github event can take an unknown delay to be triggered
  const { refetchOnWindowFocus, refetchInterval, onRefetching, onForcePooling } = usePooling({
    limit: 5,
    delays: 3000,
  });

  const {
    data: organizationsData,
    isRefetching,
    isLoading,
    refetch,
  } = GithubReactQueryAdapter.client.useGetMyOrganizations({
    options: {
      retry: 1,
      refetchOnWindowFocus,
      refetchInterval,
    },
  });

  const PoolingFeedback = usePoolingFeedback({
    onForcePooling,
    isLoading,
    isRefetching,
    fetch: refetch,
    ui: {
      label: "Resync organizations",
    },
  });

  useEffect(() => {
    onRefetching(isRefetching);
  }, [isRefetching]);

  const { mutate: createProject, ...restCreateProjectMutation } = ProjectReactQueryAdapter.client.useCreateProject({
    options: {
      onSuccess: data => {
        toast.success("Project created successfully");
        if (data?.projectSlug) {
          router.push(NEXT_ROUTER.projects.details.root(data.projectSlug));
        }
      },
      onError: () => {
        toast.error("Failed to create project");
      },
    },
  });

  const form = useForm<CreateFormData>({
    mode: "all",
    defaultValues: {
      moreInfos: [{ url: "", value: "" }],
    },
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (user && !form.getValues("projectLeads")?.length) {
      form.setValue("projectLeads", [user]);
    }
  }, [user]);

  const { mutateAsync: uploadLogo, isPending: isUploadingLogo } =
    ProjectReactQueryAdapter.client.useUploadProjectLogo();

  const onSubmit = async () => {
    const { githubRepoIds, moreInfos, logoFile, labels, rewardSettingsArrays, rewardSettingsDate, ...formData } =
      form.getValues();

    const fileUrl = logoFile ? await uploadLogo(logoFile) : undefined;

    createProject({
      ...formData,
      logoUrl: fileUrl?.url,
      contributorLabels: labels.map(label => ({ name: label.name, id: label.backendId })),
      projectLeads: formData.projectLeads?.map(u => u.id || "") || [],
      isLookingForContributors: formData.isLookingForContributors || false,
      githubRepoIds: githubRepoIds || [],
      moreInfos: (moreInfos || []).filter(info => info.url !== "").map(info => ({ url: info.url, value: info.value })),
      rewardSettings: {
        ignorePullRequests: !rewardSettingsArrays.includes(rewardsSettingsTypes.PullRequests),
        ignoreIssues: !rewardSettingsArrays.includes(rewardsSettingsTypes.Issue),
        ignoreCodeReviews: !rewardSettingsArrays.includes(rewardsSettingsTypes.CodeReviews),
        ignoreContributionsBefore: rewardSettingsDate?.toISOString(),
      },
    });
  };

  const addRepository = (data: number) => {
    const formValues = form.getValues();
    const repos = [...(formValues.githubRepoIds || [])];

    const findRepo = repos.find(repo => repo === data);
    if (!findRepo) {
      repos.push(data);
      form.setValue("githubRepoIds", repos, { shouldDirty: true, shouldValidate: true });
    }
  };

  const removeRepository = (data: number) => {
    const formValues = form.getValues();
    const repos = [...(formValues.githubRepoIds || [])];

    const findRepoIndex = repos.findIndex(repo => repo === data);
    if (findRepoIndex !== -1) {
      repos.splice(findRepoIndex, 1);
      form.setValue("githubRepoIds", repos, { shouldDirty: true, shouldValidate: true });
    }
  };

  const goTo = useCallback(
    (step: ProjectCreationSteps) => {
      setCurrentStep(step);
      if (backgroundRef?.current) {
        backgroundRef.current.scrollTop = 0;
      }
    },
    [currentStep]
  );

  const next = useCallback(() => {
    goTo(ProjectCreationStepsNext[currentStep]);
  }, [currentStep]);

  const prev = useCallback(() => {
    goTo(ProjectCreationStepsPrev[currentStep]);
  }, [currentStep]);

  useEffect(() => {
    if (organizationsData) {
      const filteredSelectedRepos = onSyncOrganizations({
        organizations: organizationsData.organizations || [],
        selectedRepos: form.getValues("githubRepoIds") || [],
      });
      if (filteredSelectedRepos) {
        form.setValue("githubRepoIds", filteredSelectedRepos, { shouldDirty: true, shouldValidate: true });
      }
    }
  }, [organizationsData, installation_id]);

  return (
    <CreateProjectContext.Provider
      value={{
        form,
        currentStep,
        organizationsLoading: !organizationsData?.organizations.length && isLoading,
        organizations: (organizationsData?.organizations || []).sort((a, b) => a.login.localeCompare(b.login)),
        PoolingFeedback,
        isSubmitting: restCreateProjectMutation.isPending || form.formState.isSubmitting || isUploadingLogo,
        helpers: {
          goTo,
          prev,
          next,
        },
        formFn: {
          addRepository,
          removeRepository,
        },
      }}
    >
      <div className="h-full">
        <form
          ref={backgroundRef}
          className="flex h-full items-start justify-center overflow-auto p-2 pb-36 md:items-center md:overflow-visible md:p-6 md:pb-0"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {children}
        </form>
      </div>
    </CreateProjectContext.Provider>
  );
}
