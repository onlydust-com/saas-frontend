export function getGithubUserIdFromSub(sub?: string): number | undefined {
  return sub ? Number(sub.split("|")[1]) : undefined;
}
