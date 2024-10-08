import { AvatarPort } from "@/design-system/atoms/avatar";
import { TypoPort } from "@/design-system/atoms/typo";

interface User {
  login: string;
  avatarUrl: string;
}

export interface UserGroupProps {
  users: User[];
  maxUsers?: number;
  avatarProps?: AvatarPort;
  label?: TypoPort<"span">;
}
