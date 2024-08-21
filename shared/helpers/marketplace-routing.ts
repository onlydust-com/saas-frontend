export function marketplaceRouting(path: string) {
  return `${process.env.NEXT_PUBLIC_MARKETPLACE_URL ?? ""}${path}`;
}
