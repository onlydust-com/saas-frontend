import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";

interface IndexingMessage {
  id: number;
  text: string;
}

const INDEXING_MESSAGES: IndexingMessage[] = [
  { id: 1, text: "Fetching your data from GitHub..." },
  { id: 2, text: "Building your personalized profile..." },
  { id: 3, text: "Analyzing your contributions..." },
  { id: 4, text: "Almost there! Creating your dashboard..." },
];

const ROTATION_INTERVAL = 10000 / 4; // 10 seconds

export function IndexingBanner() {
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>();

  const showNextMessage = useCallback((index: number) => {
    const message = INDEXING_MESSAGES[index];

    toast(message.text, {
      duration: ROTATION_INTERVAL * 3,
      position: "bottom-center",
      className: "bg-purple-500 text-white",
      style: {
        backgroundColor: "oklch(0.291 0.149 302.717)",
        color: "oklch(0.714 0.203 305.504)",
        borderColor: "oklch(0.438 0.218 303.724)",
      },
      icon: <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-400 border-t-transparent" />,
    });
  }, []);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const currentIndex = Math.floor(elapsed / ROTATION_INTERVAL);

      if (currentIndex < INDEXING_MESSAGES.length) {
        if (elapsed % ROTATION_INTERVAL < 16) {
          // Check if we're within one frame (assuming 60fps)
          showNextMessage(currentIndex);
        }
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    },
    [showNextMessage]
  );

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  return null;
}
