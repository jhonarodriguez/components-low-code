import React, { useCallback, useMemo } from "react";
import {
    FormFieldDefinition,
    FormSettings,
    FormSubmitPayload,
} from "../../../core/types";
import { Button } from "../ui/button";

interface FormProps {
    settings: FormSettings;
    data?: Record<string, unknown>;
    onSubmit: (payload: FormSubmitPayload) => void;
    onCancel: () => void;
}

function resolveFieldTitle(field: FormFieldDefinition): string {
    return field.name || field.key;
}

export const Form: React.FC<FormProps> = ({
    settings,
    data = {},
    onSubmit,
    onCancel,
}) => {
    const activeFields = useMemo(
        () => settings.fields.filter((field) => field.key),
        [settings.fields],
    );

    const submit = useCallback(() => {
        onSubmit({ data: { ...data } });
    }, [data, onSubmit]);

    return (
        <form
            className="w-full"
            onSubmit={(event) => {
                event.preventDefault();
                submit();
            }}
        >
            <div className="w-full">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {settings.name ?? "Formulario"}
                </h3>

                <div className="flex flex-col gap-3">
                    {activeFields.length > 0 ? (
                        activeFields.map((field) => (
                            <div
                                key={field.key}
                                className="rounded-lg border border-[#E8E9EB] bg-[#F8F8F8] p-3"
                            >
                                <p className="text-sm font-medium text-[#3F434A]">
                                    {resolveFieldTitle(field)}
                                </p>
                                <p className="text-xs text-[#8A9099] mt-1">
                                    Componente{" "}
                                    <span className="font-medium">
                                        {field.type || "input"}
                                    </span>{" "}
                                    pendiente de migrar
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="rounded-lg border border-[#E8E9EB] bg-[#F8F8F8] p-3 text-sm text-[#8A9099]">
                            No hay componentes configurados para este formulario.
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-2 items-center justify-center md:flex-row mt-5 pb-1">
                    {settings.showCancel !== false ? (
                        <Button
                            text="Cancelar"
                            className="px-4 py-3 h-[40px] text-[#3F434A] bg-white border border-[#E8E9EB] rounded-[12px] flex items-center group relative"
                            onClick={onCancel}
                        />
                    ) : null}
                    {!settings.hiddenSubmit ? (
                        <Button
                            text={settings.textSendBtn ?? "Guardar"}
                            className="px-4 py-3 h-[40px] text-white bg-[#304FFD] hover:bg-[#263fca] rounded-[12px] shadow-[0_4px_0px_#263fca] flex items-center group relative"
                            onClick={submit}
                        />
                    ) : null}
                </div>
            </div>
        </form>
    );
};
