import React, { useCallback } from "react";
import { isTrue, toTextValue } from "./utils";
import { FieldComponentProps } from "../../../core/types";

export const Textarea: React.FC<FieldComponentProps> = ({
    field,
    value,
    onValueChange,
}) => {
    const label = field.label ?? field.name ?? field.key;
    const disabled = isTrue(field.disabled);
    const readOnly = isTrue(field.readOnly);
    const rows = field.rows && field.rows > 0 ? field.rows : 5;

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            onValueChange({ id: field.key, value: event.target.value });
        },
        [field.key, onValueChange],
    );

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-500">{label}</label>
            <textarea
                id={field.key}
                rows={rows}
                value={toTextValue(value)}
                placeholder={field.placeholder}
                disabled={disabled}
                readOnly={readOnly}
                onChange={handleChange}
                className="block w-full p-3 text-sm text-[#3F434A] border border-[#E8E9EB] rounded-[12px] bg-white focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
        </div>
    );
};
