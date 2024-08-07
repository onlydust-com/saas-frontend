import { AvatarPort } from "@/design-system/atoms/avatar/avatar.types";
import { getAvatarImageSize } from "@/design-system/atoms/avatar/avatar.utils";
import { Skeleton } from "@/design-system/atoms/skeleton";

export function AvatarLoading({ size, shape }: AvatarPort) {
  const [width, height] = getAvatarImageSize(size);

  return (
    <Skeleton
      shape={shape === "square" ? "square" : "circle"}
      style={{
        width,
        height,
      }}
    />
  );
}
