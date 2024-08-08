import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";

export function useCurrentUser() {
  const { data: user, ...restQuery } = UserReactQueryAdapter.client.useGetMe({});

  return { user, ...restQuery };
}
