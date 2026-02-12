/**
 * Tipos base del sistema de acciones
 */
export type ActionType = "http" | "script" | "emit" | "openModal" | "redirect";

export interface BaseAction {
  type: ActionType;
  conditions?: ActionCondition[];
}

export interface HttpAction extends BaseAction {
  type: "http";
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  payload?: unknown;
  query?: Record<string, unknown>;
}

export interface ScriptAction extends BaseAction {
  type: "script";
  code: string;
}

export interface EmitAction extends BaseAction {
  type: "emit";
  event: string;
  data?: unknown;
}

export type Action = HttpAction | ScriptAction | EmitAction;

export interface ActionCondition {
  field?: string;
  operator?: string;
  value?: unknown;
}

export interface ActionContext {
  data?: unknown;
  row?: Record<string, unknown>;
  form?: Record<string, unknown>;
  params?: Record<string, unknown>;
  user?: Record<string, unknown>;
  bus?: EventBus;
}

export interface EventBus {
  on(event: string, handler: (data: unknown) => void): void;
  off(event: string, handler: (data: unknown) => void): void;
  emit(event: string, data?: unknown): void;
}

export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: Error;
}