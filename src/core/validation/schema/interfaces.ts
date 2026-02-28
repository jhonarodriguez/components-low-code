import { Constraint, Schema, ValidationDataResult, ValidationError } from "../../types";

export interface IValidator {
    validate(data: Record<string, unknown>, schema: Schema): ValidationDataResult;
}

export interface IValidatorStrategy {
    canHandle(constraintName: string): boolean;
    validate(
        constraint: Constraint,
        fieldKey: string,
        data: Record<string, unknown>,
        fieldAlias: string
    ): ValidationError;
}