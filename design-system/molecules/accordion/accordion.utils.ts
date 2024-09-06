import {
  AccordionMultiplePort,
  AccordionPort,
  AccordionSinglePort,
} from "@/design-system/molecules/accordion/accordion.types";

export function isAccodionSingle(accordion: AccordionPort): accordion is AccordionSinglePort {
  return (accordion as AccordionSinglePort).items === undefined;
}

export function isAccodionMultiple(accordion: AccordionPort): accordion is AccordionMultiplePort {
  return (accordion as AccordionSinglePort).items !== undefined;
}
