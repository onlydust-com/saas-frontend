import { ModalPort } from "@/design-system/molecules/modal";

export interface ManageRewardsModalProps extends Pick<ModalPort<"div">, "isOpen" | "onOpenChange"> {
  projectId?: string;
}
