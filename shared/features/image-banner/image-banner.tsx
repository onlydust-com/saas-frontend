import onlydustLogoSpace from "@/public/images/logos/onlydust-logo-space.webp";
import { useMemo, useState } from "react";

import { cn } from "@/shared/utils";

import { ImageBannerProps } from "./image-banner.types";

export function ImageBanner({ children, image, className, isLoading }: ImageBannerProps) {
  const [isError, setIsError] = useState(false);

  const renderImage = useMemo(() => {
    if (isLoading) {
      return null;
    }

    if (isError || !image) {
      return (
        <img
          src={onlydustLogoSpace.src}
          className="absolute inset-0 -z-[1] h-full w-full object-cover object-center"
          style={{
            filter: "blur(50px)",
            transform: "scale(3)",
          }}
        />
      );
    }

    return (
      <img
        src={image}
        className="absolute inset-0 -z-[1] h-full w-full object-cover object-center"
        style={{
          filter: "blur(50px)",
          transform: "scale(3)",
        }}
        loading="lazy"
        onError={() => {
          setIsError(true);
        }}
      />
    );
  }, [isError, image, isLoading]);

  return (
    <div className={cn("relative z-[1] overflow-hidden", className)}>
      {renderImage}
      {children}
    </div>
  );
}
