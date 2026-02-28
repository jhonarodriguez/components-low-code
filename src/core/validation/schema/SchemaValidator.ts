import { SchemaField, ValidationError } from './../../types';
import { Schema, ValidationDataResult } from "../../types";
import { IValidator, IValidatorStrategy } from "./interfaces";
import { RequiredValidator } from './validators';


export class DataValidator implements IValidator {
    private strategies: Record<string, IValidatorStrategy>;

    constructor() {
        this.strategies = {
            'required': new RequiredValidator(),
        };
    }

    validate(data: Record<string, unknown>, schema: Schema): ValidationDataResult {

        if (!schema || !schema.fields || Object.keys(schema.fields).length === 0 || !data || data.length === 0) {
            return {
                isValid: true,
                errors: []
            };
        }

        const errors = Object.entries(schema.fields).flatMap(([fieldKey, fieldSchema]) => {
            return this.validateField(data, fieldKey, fieldSchema);
        });

        return {
            isValid: errors.length === 0,
            errors,
        };

    }

    validateField(data: Record<string, unknown>, fieldKey: string, fieldSchema: SchemaField): ValidationError[] {
        const fieldAlias = fieldSchema.aliasKey || fieldKey;

        return fieldSchema.constraints.flatMap(constraint => {
            const strategy = this.strategies[constraint.name];
            if (strategy) {
                return strategy.validate(constraint, fieldKey, data, fieldAlias);
            }
            return [];
        });
    }
}