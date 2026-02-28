import { IValidator } from "./interfaces";
import { DataValidator } from "./SchemaValidator";

export function CreateSchemaValidator(): IValidator {
    return new DataValidator();
}