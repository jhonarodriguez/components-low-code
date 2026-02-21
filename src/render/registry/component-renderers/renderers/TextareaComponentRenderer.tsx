import React from "react";
import { Textarea } from "../../../components/inputs";
import { ComponentRenderer } from "../ComponentRenderer";
import { ComponentRendererContext } from "../ComponentRendererContext";
import { RenderableComponent } from "../types";

export class TextareaComponentRenderer extends ComponentRenderer {
    supports(component: RenderableComponent): boolean {
        return (component.type ?? "").trim().toLowerCase() === "textarea";
    }

    render(
        component: RenderableComponent,
        context: ComponentRendererContext,
    ): React.ReactNode {
        return (
            <Textarea
                field={{
                    ...component,
                    disabled: context.disabledAllForm ? true : component.disabled,
                }}
                value={context.getValue(component.key)}
                onValueChange={context.valueChange}
            />
        );
    }
}
