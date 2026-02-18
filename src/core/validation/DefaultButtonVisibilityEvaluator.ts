import { BtnActionConfig, ButtonValidation } from "../types";
import { ButtonVisibilityEvaluator, VisibilityContext } from "./interfaces";
import { getOperator, getNestedValueFromObject } from "./operators";

function coerceBoolean(val: unknown): unknown {
  if (val === "true") return true;
  if (val === "false") return false;
  if (val === "null") return null;
  return val;
}

function resolveToday(val: unknown): unknown {
  if (val === "today") return new Date().toISOString().split("T")[0];
  return val;
}

function resolveDataValue(
  field: string,
  value: unknown,
  context: VisibilityContext,
): unknown {
  if (field === "permissions") return context.permissions;
  if (field === "actions") return context.actions[value as string];
  if (field === "true") return true;
  if (field === "false") return false;
  return getNestedValueFromObject(
    context.row as Record<string, unknown>,
    field,
  );
}

function evaluateValidation(
  validation: ButtonValidation,
  context: VisibilityContext,
): boolean {
  const resolvedValue = resolveToday(coerceBoolean(validation.value));
  const resolvedExpected = coerceBoolean(validation.expectedValue);
  const dataValue = resolveDataValue(
    validation.field,
    resolvedValue,
    context,
  );

  const operatorFn = getOperator(validation.operator);
  if (!operatorFn) return false;

  return operatorFn(
    dataValue,
    resolvedValue,
    resolvedExpected,
    validation.field,
    context.row as Record<string, unknown>,
    context.rows ?? [],
  );
}

export class DefaultButtonVisibilityEvaluator
  implements ButtonVisibilityEvaluator
{
  isVisible(config: BtnActionConfig, context: VisibilityContext): boolean {
    const { validations } = config;

    if (!validations || validations.length === 0) return true;

    return validations.every((validation) =>
      evaluateValidation(validation, context),
    );
  }
}
