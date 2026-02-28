import { Constraint, ValidationError } from "../../../types";
import { IValidatorStrategy } from "../interfaces";

export class LessThanOrEqualValidator implements IValidatorStrategy {
    canHandle(constraintName: string): boolean {
        return constraintName === 'less_than_or_equal';
    }

    validate(
        constraint: Constraint,
        fieldKey: string,
        data: Record<string, unknown>,
        fieldAlias: string
    ): ValidationError[] {
        const { targetField, targetFieldName } = constraint;
        const fieldValue = data[fieldKey] as string ;
        const targetValue = data[targetField as string] as string;

        if (targetValue !== undefined && fieldValue > targetValue) {
            return [{
                field: fieldAlias,
                message: `${fieldAlias} debe ser menor o igual a ${targetFieldName}`,
                constraint: constraint
            }];
        }

        return [];
    }
}
