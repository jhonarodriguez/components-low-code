import { Constraint, ValidationError } from "../../../types";
import { IValidatorStrategy } from "../interfaces";

export class PatternValidator implements IValidatorStrategy {
    canHandle(constraintName: string): boolean {
        return constraintName === 'pattern';
    }

    validate(
        constraint: Constraint,
        fieldKey: string,
        data: Record<string, unknown>,
        fieldAlias: string
    ): ValidationError[] {
        const { value: constraintValue } = constraint;
        const fieldValue = data[fieldKey];

        if (typeof fieldValue === 'string' && constraintValue) {
            let regex = new RegExp(constraintValue);
            const regexParts = constraintValue?.match(/^\/(.+)\/([a-z]*)$/i);
            if (regexParts) {
                const pattern = regexParts[1];
                regex = new RegExp(pattern, regexParts[2]);
            }
            if (!regex.test(fieldValue)) {
                return [{
                    field: fieldAlias,
                    message: `${fieldAlias} no tiene el formato correcto`,
                    constraint: constraint
                }];
            }
        }

        return [];
    }
}
