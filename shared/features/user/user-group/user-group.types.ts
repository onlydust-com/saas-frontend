import { AvatarPort } from "@/design-system/atoms/avatar";

interface User {
  login: string;
  avatarUrl: string;
}

export interface UserGroupProps {
  users: User[];
  avatarProps?: AvatarPort;
  totalUsersCount?: number;
  maxUsers?: number;
}
