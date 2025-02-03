import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useLogout } from "@/shared/hooks/auth/use-logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Skeleton } from "@/shared/ui/skeleton";

export function AppUserMenu() {
  const { user, isLoading } = useAuthUser();
  const handleLogout = useLogout();

  if (isLoading) {
    return <Skeleton className="size-9 rounded-lg" />;
  }

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 rounded-lg">
          <AvatarImage src={user.avatarUrl} alt={user.login} />
          <AvatarFallback className="size-9 rounded-lg">{user.login.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-36" align="end">
        <DropdownMenuGroup>
          {/* <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem asChild>
            <Link href="/support">Support</Link>
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
