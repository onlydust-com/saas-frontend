import GalleryLine from "@/legacy/src/icons/GalleryLine";

import { cn } from "@/shared/utils";

const sizes = {
  "2": "w-2 h-2",
  "3.5": "w-3.5 h-3.5",
  "4": "w-4 h-4",
  "5": "w-5 h-5",
  "6": "w-6 h-6",
  "12": "w-12 h-12",
} as const;

const shapes: { square: Record<keyof typeof sizes, string>; circle: string } = {
  square: {
    "2": "rounded-xs",
    "3.5": "rounded-xs",
    "4": "rounded-xs",
    "5": "rounded",
    "6": "rounded-lg",
    "12": "rounded-xl",
  },
  circle: "rounded-full",
} as const;

const border: Record<keyof typeof sizes, string> = {
  "2": "border-1",
  "3.5": "border-1",
  "4": "border-1",
  "5": "border-1.5",
  "6": "border-2",
  "12": "border-2",
} as const;

export interface AvatarProps {
  src: string;
  alt: string;
  shape?: keyof typeof shapes;
  size?: keyof typeof sizes;
  className?: string;
}

export function Avatar({ src, alt, shape = "circle", size = "6", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "border-greyscale-50/12 bg-greyscale-50/8 relative box-content flex items-center justify-center overflow-hidden",
        shape === "circle" ? shapes[shape] : shapes[shape][size],
        sizes[size],
        border[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="bg-greyscale-900 h-full w-full object-cover" loading="lazy" />
      ) : (
        <GalleryLine className="text-spaceBlue-300 h-4 w-4" />
      )}
    </div>
  );
}
