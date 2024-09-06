import {
  AccordionMultiplePort,
  AccordionPort,
  AccordionSinglePort,
} from "@/design-system/molecules/accordion/accordion.types";

export function isAccordionSingle(accordion: AccordionPort): accordion is AccordionSinglePort {
  return (accordion as AccordionSinglePort).items === undefined;
}

export function isAccordionMultiple(accordion: AccordionPort): accordion is AccordionMultiplePort {
  return (accordion as AccordionSinglePort).items !== undefined;
}
