import { Constraint, ValidationError } from "../../../types";
import { IValidatorStrategy } from "../interfaces";

export class MaxLengthValidator implements IValidatorStrategy {
    canHandle(constraintName: string): boolean {
        return constraintName === 'max_length';
    }

    validate(
        constraint: Constraint,
        fieldKey: string,
        data: Record<string, unknown>,
        fieldAlias: string
    ): ValidationError[] {
        const { value: constraintValue } = constraint;
        const fieldValue = data[fieldKey];

        if (typeof fieldValue === 'string' && fieldValue.length > parseInt(constraintValue)) {
            return [{
                field: fieldAlias,
                message: `${fieldAlias} debe tener máximo ${constraintValue} caracteres`,
                constraint: constraint
            }];
        }

        return [];
    }
}
