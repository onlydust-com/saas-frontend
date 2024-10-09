import { ModalPort } from "@/design-system/molecules/modal";

export interface ManageApplicantsModalProps extends Pick<ModalPort<"div">, "isOpen" | "onOpenChange"> {
  projectId?: string;
  contributionId?: string;
  onAssign: (githubUserId: number) => void;
}
