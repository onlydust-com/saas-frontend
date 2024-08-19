import { RefObject, useEffect } from "react";

export const useMutationObserver = (
  ref: RefObject<Element>,
  callback: () => void,
  options = {
    attributes: true,
    characterData: false,
    childList: true,
    subtree: false,
  }
) => {
  useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
      return () => observer.disconnect();
    }
  }, [callback, options, ref]);
};
