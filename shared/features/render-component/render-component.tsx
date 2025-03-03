import { AnimatePresence, motion } from "framer-motion";
import { Children, PropsWithChildren, ReactElement } from "react";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { TypographyMuted } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { RenderComponentProps } from "./render-component.types";

export function RenderComponent({
  children,
  isLoading,
  isError,
  isEmpty,
  classNames,
}: PropsWithChildren<RenderComponentProps>) {
  const array = Children.toArray(children) as ReactElement[];

  const findLoading = array.find(c => c.type === RenderComponent.Loading);
  const findError = array.find(c => c.type === RenderComponent.Error);
  const findEmpty = array.find(c => c.type === RenderComponent.Empty);
  const findDefault = array.find(c => c.type === RenderComponent.Default);

  function renderEmpty() {
    if (isEmpty && findEmpty && !isLoading && !isError) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={classNames?.error}
        >
          {findError?.props.children}
        </motion.div>
      );
    }

    return null;
  }

  function renderError() {
    if (isError && findError && !isLoading) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={classNames?.error}
        >
          {findError?.props.children}
        </motion.div>
      );
    }

    return null;
  }

  function renderLoading() {
    if (isLoading && findLoading) {
      return findLoading?.props.children;
    }

    return null;
  }

  function renderDefault() {
    if (isLoading || isError || isEmpty) {
      return null;
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={classNames?.default}
      >
        {findDefault?.props.children}
      </motion.div>
    );
  }

  return (
    <>
      {renderLoading()}
      <AnimatePresence>{renderError()}</AnimatePresence>
      <AnimatePresence>{renderEmpty()}</AnimatePresence>
      <AnimatePresence>{renderDefault()}</AnimatePresence>
    </>
  );
}

RenderComponent.Loading = function Loading({ children, className }: PropsWithChildren<{ className?: string }>) {
  return children || <Skeleton className={className} />;
};

RenderComponent.Error = function Error({
  children,
  className,
  errorMessage,
}: PropsWithChildren<{ className?: string; errorMessage?: string }>) {
  return (
    children || (
      <div className={cn("flex items-center justify-center py-10", className)}>
        <TypographyMuted>{errorMessage || "Error loading data"}</TypographyMuted>
      </div>
    )
  );
};

RenderComponent.Empty = function Empty({
  children,
  className,
  emptyMessage,
}: PropsWithChildren<{ className?: string; emptyMessage?: string }>) {
  return (
    children || (
      <div className={cn("flex items-center justify-center py-10", className)}>
        <TypographyMuted>{emptyMessage || "No data found"}</TypographyMuted>
      </div>
    )
  );
};

RenderComponent.Default = function Default({ children }: PropsWithChildren) {
  return children;
};
