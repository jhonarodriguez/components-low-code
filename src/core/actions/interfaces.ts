import { Action, ActionContext, ActionResult } from "./types";

/**
 * Strategy pattern: cada tipo de acción tiene su executor
 */
export interface ActionExecutor<T extends Action = Action> {
  canExecute(action: Action): action is T;
  execute(action: T, context: ActionContext): Promise<ActionResult>;
}

/**
 * Responsable de decidir si una acción debe ejecutarse
 */
export interface ConditionEvaluator {
  evaluate(conditions: Action["conditions"], context: ActionContext): boolean;
}

/**
 * Logger para acciones
 */
export interface ActionLogger {
  logStart(action: Action, context: ActionContext): void;
  logSuccess(action: Action, result: ActionResult): void;
  logError(action: Action, error: Error): void;
}