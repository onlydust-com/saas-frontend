import { ReactNode, useMemo, useState } from "react";

export function useImageWithFallback({
  src,
  alt,
  fallback,
  className,
}: {
  src?: string;
  alt?: string;
  fallback: ReactNode;
  className?: string;
}) {
  const [isError, setIsError] = useState(false);

  const renderImage = useMemo(() => {
    if (isError || !src) {
      return fallback;
    }

    return (
      <img
        src={src}
        className={className}
        alt={alt}
        loading="lazy"
        onError={() => {
          setIsError(true);
        }}
      />
    );
  }, [isError, src, alt, className, fallback]);

  return renderImage;
}
