import React, { useCallback } from "react";
import { isTrue, toTextValue } from "./utils";
import { FieldComponentProps } from "../../../core/types";

export const Input: React.FC<FieldComponentProps> = ({
    field,
    value,
    onValueChange,
}) => {
    const label = field.label ?? field.name ?? field.key;
    const type = field.inputType ?? "text";
    const disabled = isTrue(field.disabled);
    const readOnly = isTrue(field.readOnly);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onValueChange({ id: field.key, value: event.target.value });
        },
        [field.key, onValueChange],
    );

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-500">{label}</label>
            <input
                id={field.key}
                type={type}
                value={toTextValue(value)}
                placeholder={field.placeholder}
                disabled={disabled}
                readOnly={readOnly}
                onChange={handleChange}
                className="block w-full py-3 px-4 ps-3 text-sm text-[#3F434A] border border-[#E8E9EB] rounded-[12px] bg-white focus:ring-blue-500 focus:border-blue-500 min-w-52 disabled:bg-gray-100"
            />
        </div>
    );
};
