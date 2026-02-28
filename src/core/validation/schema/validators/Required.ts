import { Constraint, ValidationError } from "../../../types";
import { IValidatorStrategy } from "../interfaces";


export class RequiredValidator implements IValidatorStrategy {
    canHandle(constraintName: string): boolean {
        return constraintName === 'required';
    }

    validate(
        constraint: Constraint,
        fieldKey: string,
        data: Record<string, unknown>,
        fieldAlias: string
    ): ValidationError {

        const { value: constraintValue } = constraint;


        if (constraintValue !== 'true') {
            return {} as ValidationError;
        }

        const fieldValue = data[fieldKey];
        const isEmpty = fieldValue === undefined || fieldValue === null || fieldValue === '' || (Array.isArray(fieldValue) && fieldValue.length === 0);
        if (isEmpty) {
            return {
                field: fieldAlias,
                message: `${fieldAlias} es requerido.`,
                constraint: constraint
            };
        }

        return {} as ValidationError;
    }
}