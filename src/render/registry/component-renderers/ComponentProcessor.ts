import { BooleanLike } from "../../../core/types";
import { ComponentProcessingSettings, RenderableComponent } from "./types";

export class ComponentProcessor {
    process(
        component: RenderableComponent,
        settings: ComponentProcessingSettings,
        disabledAllForm: boolean,
    ): RenderableComponent {
        return {
            ...component,
            permissions: settings.permissions ?? component.permissions,
            datasource: settings.datasource ?? component.datasource,
            moduleId: settings.moduleId ?? component.moduleId,
            disabledAllForm,
            schema: settings.schema ?? component.schema,
            active: this.toBoolean(component.active ?? true),
            disabled: this.resolveDisabled(component, settings.mode),
        };
    }

    isRenderable(component: RenderableComponent | null | undefined): boolean {
        if (!component) return false;
        return this.toBoolean(component.active ?? true);
    }

    private resolveDisabled(
        component: RenderableComponent,
        mode?: string,
    ): BooleanLike {
        const currentMode = mode ?? "creation";
        if (currentMode === "creation") {
            return component.disabledInCreation ?? component.disabled ?? false;
        }

        return component.disabledInEdition ?? component.disabled ?? false;
    }

    private toBoolean(value: boolean | "true" | "false"): boolean {
        return value === true || value === "true";
    }
}
