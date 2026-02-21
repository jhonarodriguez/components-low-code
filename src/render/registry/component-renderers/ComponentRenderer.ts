import React from "react";
import { ComponentRendererContext } from "./ComponentRendererContext";
import { RenderableComponent } from "./types";

export abstract class ComponentRenderer {
    abstract supports(component: RenderableComponent): boolean;

    abstract render(
        component: RenderableComponent,
        context: ComponentRendererContext,
    ): React.ReactNode | null;
}
