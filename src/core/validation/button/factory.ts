import { ButtonVisibilityEvaluator } from "./interfaces";
import { DefaultButtonVisibilityEvaluator } from "./DefaultButtonVisibilityEvaluator";

export function createButtonVisibilityEvaluator(): ButtonVisibilityEvaluator {
  return new DefaultButtonVisibilityEvaluator();
}
