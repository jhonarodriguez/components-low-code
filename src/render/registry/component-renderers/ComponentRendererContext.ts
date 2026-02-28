import { ValueChange } from "../../../core/types";

export interface ComponentRendererContext {
    data: Record<string, unknown>;
    context: unknown;
    dataTable?: unknown;
    disabledAllForm: boolean;
    loading?: boolean;
    getValue: (key: string) => unknown;
    valueChange: (change: ValueChange) => void;
    handleActions?: (event: unknown) => void;
    handlerClickRowComments?: (event: unknown) => void;
    handleAdd?: (event: unknown) => void;
    handlerClickOpenEditor?: (event: unknown) => void;
    handlerRedirect?: (event: unknown) => void;
}
