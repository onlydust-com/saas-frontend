import { ModalPort } from "@/design-system/molecules/modal";

export interface GithubPublicScopePermissionModalProps extends Pick<ModalPort<"div">, "isOpen" | "onOpenChange"> {
  onRedirect: () => void;
}
