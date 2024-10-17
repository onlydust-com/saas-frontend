import { RefreshCw } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";

import { cn } from "@/shared/helpers/cn";

import {
  UsePoolingFeedbackProps,
  UsePoolingFeedbackReturn,
  UsePoolingProps,
  UsePoolingReturn,
} from "./usePooling.type";

export const usePooling = ({ limites, delays, enabled }: UsePoolingProps): UsePoolingReturn => {
  const poolingCount = useRef(0);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const refetchOnWindowFocus = () => {
    poolingCount.current = 0;
    setShouldRefetch(true);
    return true;
  };

  const refetchInterval = () => {
    if (!enabled) {
      return 0;
    }
    if (poolingCount.current < limites || shouldRefetch) {
      setShouldRefetch(false);
      return delays;
    }
    return 0;
  };
  const resetPooling = () => {
    poolingCount.current = 0;
  };

  return {
    refetchOnWindowFocus,
    refetchInterval,
    resetPooling,
    count: poolingCount.current,
    onRefetching: (isRefetching: boolean) => {
      if (isRefetching) {
        poolingCount.current = poolingCount.current + 1;
      }
    },
    onForcePooling: () => {
      poolingCount.current = limites;
    },
  };
};

export const usePoolingFeedback = ({
  isRefetching,
  isLoading,
  onForcePooling,
  fetch,
  ui,
}: UsePoolingFeedbackProps): UsePoolingFeedbackReturn => {
  const onTriggerRefecth = () => {
    if (!isLoading && !isRefetching) {
      onForcePooling();
      fetch();
    }
  };
  const Ui = useMemo(() => {
    if (ui.customComponents) {
      return ui.customComponents({ isSyncing: isRefetching || isLoading });
    }

    return (
      <Button
        variant={"secondary"}
        size={"sm"}
        isDisabled={isRefetching || isLoading}
        classNames={{ base: "w-full" }}
        onClick={onTriggerRefecth}
      >
        <Icon
          component={RefreshCw}
          classNames={{ base: cn({ "text-foreground-quinary animate-spin": isRefetching || isLoading }) }}
        />
        {ui.label}
      </Button>
    );
  }, [isRefetching, isLoading, fetch]);

  return Ui;
};
