import { BooleanLike, FormFieldDefinition } from "../../../core/types";

export interface RenderableComponent extends FormFieldDefinition {
    active?: boolean | "true" | "false";
    disabledAllForm?: boolean;
    permissions?: unknown;
    datasource?: unknown;
    moduleId?: unknown;
    schema?: unknown;
    mode?: string;
    disabledInCreation?: BooleanLike;
    disabledInEdition?: BooleanLike;
    renderMode?: "component" | "label-value";
}

export interface ComponentProcessingSettings {
    permissions?: unknown;
    datasource?: unknown;
    moduleId?: unknown;
    schema?: unknown;
    mode?: string;
}

export interface ProcessedComponent {
    original: RenderableComponent;
    processed: RenderableComponent;
}
