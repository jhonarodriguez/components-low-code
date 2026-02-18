import { ValidationOperator } from "../types";

type OperatorFn = (
  dataValue: unknown,
  value: unknown,
  expectedValue: unknown,
  field: string,
  row: Record<string, unknown>,
  rows: Record<string, unknown>[],
) => boolean;

function equalsOperator(
  dataValue: unknown,
  value: unknown,
  expectedValue: unknown,
  field: string,
): boolean {
  if (field === "actions") return dataValue === expectedValue;
  return dataValue === value;
}

function notEqualsOperator(dataValue: unknown, value: unknown): boolean {
  const prop = Array.isArray(dataValue) ? dataValue.length : dataValue;
  return prop !== value;
}

function containsOperator(dataValue: unknown, value: unknown): boolean {
  return Array.isArray(dataValue) && dataValue.includes(value);
}

function notContainsOperator(dataValue: unknown, value: unknown): boolean {
  if (!dataValue) return true;
  return Array.isArray(dataValue) && !dataValue.includes(value);
}

function greaterThanOperator(dataValue: unknown, value: unknown): boolean {
  const prop = Array.isArray(dataValue) ? dataValue.length : dataValue;
  return (prop as number) > (value as number);
}

function greaterThanOrEqualOperator(
  dataValue: unknown,
  value: unknown,
): boolean {
  const prop = Array.isArray(dataValue) ? dataValue.length : dataValue;
  return (prop as number) >= (value as number);
}

function lessThanOperator(dataValue: unknown, value: unknown): boolean {
  const prop = Array.isArray(dataValue) ? dataValue.length : dataValue;
  return (prop as number) < (value as number);
}

function lessThanOrEqualOperator(
  dataValue: unknown,
  value: unknown,
): boolean {
  const prop = Array.isArray(dataValue) ? dataValue.length : dataValue;
  return (prop as number) <= (value as number);
}

function existPropertyOperator(
  _dataValue: unknown,
  _value: unknown,
  _expectedValue: unknown,
  field: string,
  row: Record<string, unknown>,
): boolean {
  return Object.prototype.hasOwnProperty.call(row, field);
}

function noExistPropertyOperator(
  _dataValue: unknown,
  _value: unknown,
  _expectedValue: unknown,
  field: string,
  row: Record<string, unknown>,
): boolean {
  return !Object.prototype.hasOwnProperty.call(row, field);
}

function getNestedValue(
  obj: Record<string, unknown>,
  path: string,
): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc !== null && acc !== undefined && typeof acc === "object") {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function notEqualsAnyRowOperator(
  _dataValue: unknown,
  value: unknown,
  _expectedValue: unknown,
  field: string,
  _row: Record<string, unknown>,
  rows: Record<string, unknown>[],
): boolean {
  return !rows.some((r) => getNestedValue(r, field) === value);
}

const OPERATOR_MAP = new Map<ValidationOperator, OperatorFn>([
  ["equals", equalsOperator],
  ["notEquals", notEqualsOperator],
  ["contains", containsOperator],
  ["notContains", notContainsOperator],
  ["greaterThan", greaterThanOperator],
  ["greaterThanOrEqual", greaterThanOrEqualOperator],
  ["lessThan", lessThanOperator],
  ["lessThanOrEqual", lessThanOrEqualOperator],
  ["existProperty", existPropertyOperator],
  ["noExistProperty", noExistPropertyOperator],
  ["notEqualsAnyRow", notEqualsAnyRowOperator],
]);

export function getOperator(name: ValidationOperator): OperatorFn | undefined {
  return OPERATOR_MAP.get(name);
}

export function getNestedValueFromObject(
  obj: Record<string, unknown>,
  path: string,
): unknown {
  return getNestedValue(obj, path);
}
