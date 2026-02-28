import { Constraint, ValidationError } from "../../../types";
import { IValidatorStrategy } from "../interfaces";

export class MinLengthValidator implements IValidatorStrategy {
    canHandle(constraintName: string): boolean {
        return constraintName === 'min_length';
    }

    validate(
        constraint: Constraint,
        fieldKey: string,
        data: Record<string, unknown>,
        fieldAlias: string
    ): ValidationError[] {
        const { value: constraintValue } = constraint;
        const fieldValue = data[fieldKey];

        if (
            typeof fieldValue === 'string' &&
            fieldValue.length > 0 &&
            fieldValue.length < parseInt(constraintValue)
        ) {
            return [{
                field: fieldAlias,
                message: `${fieldAlias} debe tener al menos ${constraintValue} caracteres`,
                constraint: constraint
            }];
        }

        return [];
    }
}
