import { ModalPort } from "@/design-system/molecules/modal";

export interface GithubPermissionModalProps extends Pick<ModalPort<"div">, "isOpen" | "onOpenChange"> {
  onRedirect: () => void;
}
