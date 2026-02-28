import { Constraint, ValidationError } from "../../../types";
import { IValidatorStrategy } from "../interfaces";

export class EqualValidator implements IValidatorStrategy {
    canHandle(constraintName: string): boolean {
        return constraintName === 'equal';
    }

    validate(
        constraint: Constraint,
        fieldKey: string,
        data: Record<string, unknown>,
        fieldAlias: string
    ): ValidationError[] {
        const { value: constraintValue } = constraint;
        const fieldValue = data[fieldKey];
        const targetValue = parseInt(constraintValue);

        if (fieldValue !== targetValue) {
            return [{
                field: fieldAlias,
                message: `${fieldAlias} debe ser igual a ${constraintValue}`,
                constraint: constraint
            }];
        }

        return [];
    }
}
