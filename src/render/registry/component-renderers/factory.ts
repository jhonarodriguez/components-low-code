import { ComponentRendererRegistry } from "./ComponentRendererRegistry";
import { InputComponentRenderer } from "./renderers/InputComponentRenderer";
import { TextareaComponentRenderer } from "./renderers/TextareaComponentRenderer";

export function createDefaultComponentRendererRegistry(): ComponentRendererRegistry {
    const registry = new ComponentRendererRegistry();

    registry
        .register(new InputComponentRenderer())
        .register(new TextareaComponentRenderer());

    return registry;
}
