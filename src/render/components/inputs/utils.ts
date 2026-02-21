import { BooleanLike } from "../../../core/types";

export function isTrue(value?: BooleanLike): boolean {
    return value === true || value === "true";
}

export function toTextValue(value: unknown): string {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") return value;
    return String(value);
}
