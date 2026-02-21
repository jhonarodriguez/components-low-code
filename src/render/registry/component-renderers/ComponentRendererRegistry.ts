import React from "react";
import { ComponentRenderer } from "./ComponentRenderer";
import { ComponentRendererContext } from "./ComponentRendererContext";
import { RenderableComponent } from "./types";

export class ComponentRendererRegistry {
    private readonly renderers: ComponentRenderer[] = [];

    register(renderer: ComponentRenderer): this {
        this.renderers.push(renderer);
        return this;
    }

    render(
        component: RenderableComponent,
        context: ComponentRendererContext,
    ): React.ReactNode | null {
        const renderer = this.findRenderer(component);
        if (!renderer) return null;
        return renderer.render(component, context);
    }

    private findRenderer(component: RenderableComponent): ComponentRenderer | undefined {
        return this.renderers.find((renderer) => renderer.supports(component));
    }
}
