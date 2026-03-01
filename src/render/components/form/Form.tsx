import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    ValueChange,
    FormSettings,
    FormSubmitPayload,
    ValidationError,
} from "../../../core/types";
import {
    ComponentProcessingSettings,
    ComponentProcessor,
    ComponentRendererContext,
    RenderableComponent,
    createDefaultComponentRendererRegistry,
} from "../../registry";
import { Button } from "../ui/button";
import { CreateSchemaValidator } from "../../../core/validation/schema/factory";
import { ModalErrorSchema } from "../modal/ModalErrorSchema";

interface FormProps {
    settings: FormSettings;
    data?: Record<string, unknown>;
    onSubmit: (payload: FormSubmitPayload) => void;
    onCancel: () => void;
}

export const Form: React.FC<FormProps> = ({
    settings,
    data = {},
    onSubmit,
    onCancel,
}) => {
    const [formData, setFormData] = useState<Record<string, unknown>>({ ...data });

    const [errorsModalOpen, setErrorsModalOpen] = useState<boolean>(false);

    const [errorsForm, setErrorsForm] = useState<ValidationError[]>([])

    useEffect(() => {
        setFormData({ ...data });
    }, [data]);

    const componentProcessor = useMemo(() => new ComponentProcessor(), []);
    const rendererRegistry = useMemo(
        () => createDefaultComponentRendererRegistry(),
        [],
    );

    const activeFields = useMemo<RenderableComponent[]>(
        () =>
            settings.fields
                .filter((field) => field.key)
                .map((field) => ({ ...field })),
        [settings.fields],
    );

    const handleValueChange = useCallback((change: ValueChange) => {
        setFormData((previous) => ({
            ...previous,
            [change.id]: change.value,
        }));
    }, []);

    const getValue = useCallback(
        (key: string) => formData[key],
        [formData],
    );

    const processingSettings = useMemo<ComponentProcessingSettings>(
        () => ({
            mode: "creation",
        }),
        [],
    );

    const rendererContext = useMemo<ComponentRendererContext>(
        () => ({
            data: formData,
            context: {},
            disabledAllForm: false,
            loading: false,
            getValue,
            valueChange: handleValueChange,
        }),
        [formData, getValue, handleValueChange],
    );

    const submit = useCallback(() => {
        const valid = dataValidator.validate(formData, settings.schema)

        if(!valid.isValid){
            setErrorsForm(valid.errors)
            setErrorsModalOpen(true);
            return;
        }

        onSubmit({ data: { ...formData } });
    }, [formData, onSubmit]);

    const dataValidator = useMemo(() => CreateSchemaValidator(), []);

    const handleCloseModalErrors = useCallback(() => {
        setErrorsModalOpen(false);
    }, [])

    return (
        <form
            className="w-full"
            onSubmit={(event) => {
                event.preventDefault();
                submit();
            }}
        >
            <div className="w-full p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {settings.name}
                </h3>

                <div className="flex flex-col gap-3">
                    {activeFields.length > 0 ? (
                        activeFields.map((field) => {
                            const processed = componentProcessor.process(
                                { ...field },
                                processingSettings,
                                false,
                            );

                            if (!componentProcessor.isRenderable(processed)) {
                                return null;
                            }

                            const renderedField = rendererRegistry.render(
                                processed,
                                rendererContext,
                            );

                            return (
                                <div key={field.key}>
                                    {renderedField}
                                </div>
                            );
                        })
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
            <ModalErrorSchema 
                open={errorsModalOpen}
                onClose={handleCloseModalErrors}
                errors={errorsForm}
            />
        </form>
    );
};
