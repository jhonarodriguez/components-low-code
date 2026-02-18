import { BtnActionConfig } from "../types";

export interface VisibilityContext {
  row: Record<string, unknown>;
  permissions: string[];
  actions: Record<string, unknown>;
  rows?: Record<string, unknown>[];
}

export interface ButtonVisibilityEvaluator {
  isVisible(config: BtnActionConfig, context: VisibilityContext): boolean;
}
