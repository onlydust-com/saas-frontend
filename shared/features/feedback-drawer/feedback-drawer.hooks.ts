import { useState } from "react";

export function useFeedbackDrawerState() {
  return useState<boolean>(false);
}
