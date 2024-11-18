import { useLocalStorage } from "react-use";

export function useLocalScopeStorage() {
  return useLocalStorage("dynamic-github-public-repo-scope");
}
