import React from "react";
import { Input } from "../../../components/inputs";
import { ComponentRenderer } from "../ComponentRenderer";
import { ComponentRendererContext } from "../ComponentRendererContext";
import { RenderableComponent } from "../types";

export class InputComponentRenderer extends ComponentRenderer {
    supports(component: RenderableComponent): boolean {
        return (component.type ?? "").trim().toLowerCase() === "input";
    }

    render(
        component: RenderableComponent,
        context: ComponentRendererContext,
    ): React.ReactNode {
        return (
            <Input
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
