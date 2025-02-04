import Button, { ButtonOnBackground, ButtonType } from "@/legacy/src/components/Button";
import { Flex } from "@/legacy/src/components/New/Layout/Flex";
import ArrowLeftSLine from "@/legacy/src/icons/ArrowLeftSLine";
import ArrowRightSLine from "@/legacy/src/icons/ArrowRightSLine";
import { FC } from "react";

import { MultiStepsFormProps } from "./multiStepsForm.type";

export const MultiStepsForm: FC<MultiStepsFormProps> = ({
  step,
  stepCount,
  title,
  description,
  footerRightElement,
  prev,
  next,
  submitButton = null,
  nextDisabled,
  children,
  stickyChildren,
}) => {
  return (
    <div className="bg-card-background-base relative flex w-full max-w-full flex-col overflow-hidden rounded-2xl max-md:min-h-full md:max-h-full md:w-[688px]">
      <div className="bg-mosaic w-full bg-cover pb-1.5" />
      <div className="bg-card-background-base flex flex-col gap-4 p-4 pb-5 pt-6 md:p-12">
        <div className="font-walsheim text-spaceBlue-100 text-base font-normal">{`${step}/${stepCount}`}</div>
        <div className="font-belwe text-greyscale-50 text-2xl font-normal">{title}</div>
        {description ? (
          <div className="font-walsheim text-spaceBlue-100 text-base font-normal">{description}</div>
        ) : null}
        {stickyChildren ? stickyChildren : <div className="h-3" />}
      </div>
      <div className="flex w-full flex-1 flex-col overflow-visible px-4 md:w-auto md:overflow-auto md:px-3">
        <div className="scrollbar-thumb-spaceBlue-600 scrollbar-thumb-rounded scrollbar-w-1.5 w-full overflow-visible scrollbar-thin md:w-auto md:overflow-auto">
          <div className="px-0 pb-4 md:px-9">{children}</div>
        </div>
      </div>
      <Flex
        justify="between"
        item="center"
        gap={4}
        className="border-card-border-light bg-card-background-base fixed bottom-0 left-0 z-10 flex w-full flex-col items-start border-t p-6 shadow-medium md:relative md:bottom-auto md:left-auto md:flex-row md:items-center xl:rounded-b-2xl"
      >
        <Flex justify="start" item="center">
          {footerRightElement ? footerRightElement : null}
        </Flex>
        <Flex justify="end" item="center" gap={6} className="w-full justify-start md:w-auto md:justify-end">
          {prev && (
            <Button type={ButtonType.Secondary} onClick={prev} className="w-full md:w-auto">
              <ArrowLeftSLine className="-ml-2 text-2xl" />
              Back
            </Button>
          )}
          {next && (
            <Button
              disabled={nextDisabled}
              onBackground={ButtonOnBackground.Blue}
              onClick={next}
              className="w-full md:w-auto"
            >
              Next
              <ArrowRightSLine className="-mr-2 text-2xl" />
            </Button>
          )}
          {submitButton}
        </Flex>
      </Flex>
    </div>
  );
};

export default MultiStepsForm;
