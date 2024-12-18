import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";

import { cn } from "@/shared/helpers/cn";

export function HoverEffect({ cardRef }: { cardRef: React.RefObject<HTMLDivElement> }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredDebounced, setIsHoveredDebounced] = useState(false);

  useDebounce(
    () => {
      setIsHoveredDebounced(isHovered);
    },
    250,
    [isHovered]
  );

  const maskSize = useTransform<number, number>([mouseX, mouseY], ([x, y]) => Math.min(150, Math.sqrt(x * x + y * y)));

  useEffect(() => {
    if (cardRef.current) {
      const handleMouseMove = (event: MouseEvent) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
      };

      const handleMouseLeave = () => {
        setIsHovered(false);
      };

      const handleMouseEnter = () => {
        setIsHovered(true);
      };

      cardRef.current.addEventListener("mousemove", handleMouseMove);
      cardRef.current.addEventListener("mouseleave", handleMouseLeave);
      cardRef.current.addEventListener("mouseenter", handleMouseEnter);

      return () => {
        cardRef.current?.removeEventListener("mousemove", handleMouseMove);
        cardRef.current?.removeEventListener("mouseleave", handleMouseLeave);
        cardRef.current?.removeEventListener("mouseenter", handleMouseEnter);
      };
    }
  }, [cardRef.current]);

  return (
    <motion.div
      className={cn(
        "absolute inset-[-2px] z-10 overflow-hidden rounded-[12px] opacity-0 transition-opacity duration-500 ease-in",
        {
          "opacity-100": isHovered,
        }
      )}
    >
      <div className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[10px]">
        {isHoveredDebounced && (
          <motion.div
            className="card-hover-gradient-solid absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          />
        )}
      </div>
      <div className="app-gradient absolute inset-[2px] overflow-hidden rounded-[10px]" />
      <motion.div
        className="card-hover-gradient absolute inset-0 z-20"
        style={{
          mask: useTransform(
            [mouseX, mouseY, maskSize],
            ([x, y, size]) => `radial-gradient(circle ${size}px at ${x}px ${y}px, black, transparent)`
          ),
          opacity: isHovered ? 1 : 0,
          transition: "opacity 500ms ease-in",
        }}
      />
    </motion.div>
  );
}
