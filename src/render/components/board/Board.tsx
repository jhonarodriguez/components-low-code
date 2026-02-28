import React, { useCallback, useMemo, useRef, useState } from "react";
import {
    BoardSettings,
    FormFieldDefinition,
    FormSettings,
    FormSubmitPayload,
} from "../../../core/types";
import { Table } from "../table/Table";
import { createDataFetcher } from "../../../core/data/factories/createDataFetcher";
import { FetchParams } from "../../../core/data/interfaces/FetchParams";
import { useBoardData } from "../../hooks/useBoardData";
import { Button } from "../ui/button";
import { Modal } from "../modal";
import { Form } from "../form";

function normalizeBooleanLike(value: unknown): "true" | "false" | boolean | undefined {
    if (value === true || value === false || value === "true" || value === "false") {
        return value;
    }
    return undefined;
}

function normalizeRows(value: unknown): number | undefined {
    if (typeof value === "number" && Number.isFinite(value) && value > 0) {
        return value;
    }

    if (typeof value === "string") {
        const parsed = Number(value);
        if (Number.isFinite(parsed) && parsed > 0) return parsed;
    }

    return undefined;
}

function mapFieldsToForm(fields: BoardSettings["fields"]): FormFieldDefinition[] {
    if (!fields) return [];

    return fields
        .filter((field) => field.active !== false)
        .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
        .map((field, index) => {
            const component = field.component ?? {};
            const key = component.key || field.key || `field_${index}`;
            const name = component.name || field.name || key;
            const type = component.type || field.type || '';

            return {
                key,
                name,
                type,
                label: field.label || component.name || name,
                placeholder:
                    typeof component.placeholder === "string"
                        ? component.placeholder
                        : undefined,
                disabled: normalizeBooleanLike(component.disabled),
                readOnly: normalizeBooleanLike(component.readOnly),
                inputType:
                    typeof component.inputType === "string"
                        ? component.inputType
                        : undefined,
                rows: normalizeRows(component.rows),
            };
        });
}

function shouldShowCreate(settings: BoardSettings): boolean {
    const permissions = settings.permissions ?? [];
    const hasPermission =
        permissions.includes("all") || permissions.includes("create");
    return settings.actions?.create === true && hasPermission;
}

export function Board({ settings }: { settings: BoardSettings }) {
    const boardRef = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(
        settings.rowsPerPage || 10,
    );
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [createFormData] = useState<Record<string, unknown>>({});

    const fetcher = useMemo(() => {
        const encryption = settings.datasource.cipher
            ? {
                  secretKey: settings.datasource.cipher.key,
                  secretIv: settings.datasource.cipher.iv,
              }
            : undefined;

        return createDataFetcher(
            settings.datasource.baseUrl,
            settings.datasource.token,
            settings.datasource.endpoint,
            encryption
        );
    }, [settings.datasource]);

    const params: FetchParams = useMemo(
        () => ({
            boardId: settings.dataAccess || settings.moduleId,
            from: (currentPage - 1) * rowsPerPage,
            size: rowsPerPage,
            method: "GET"
        }),
        [settings.dataAccess, settings.moduleId, currentPage, rowsPerPage],
    );

    const { data, totalCount, loading, error } = useBoardData(fetcher, params);
    const showCreateButton = useMemo(() => shouldShowCreate(settings), [settings]);

    const formSettings = useMemo<FormSettings>(
        () => ({
            key: `${settings.moduleId}-form`,
            name: settings.name ?? "",
            type: "form",
            datasource: settings.datasource,
            fields: mapFieldsToForm(settings.fields),
            textSendBtn: settings.textSendBtn,
            showCancel: true,
            hiddenSubmit: false,
            schema: settings.schema
        }),
        [settings],
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (size: number) => {
        setRowsPerPage(size);
        setCurrentPage(1);
    };

    const emitBoardEvent = useCallback(
        (eventName: string, detail: Record<string, unknown>) => {
            const event = new CustomEvent(eventName, {
                bubbles: true,
                composed: true,
                detail,
            });
            boardRef.current?.dispatchEvent(event);
        },
        [],
    );

    const handleOpenCreate = useCallback(() => {
        setCreateModalOpen(true);
    }, []);

    const handleCloseCreate = useCallback(() => {
        setCreateModalOpen(false);
    }, []);

    const handleCancelForm = (useCallback(() => {
        setCreateModalOpen(false);
    }, [emitBoardEvent]));

    const handleSubmitCreate = useCallback(
        (payload: FormSubmitPayload) => {
            setCreateModalOpen(false);
        },
        [emitBoardEvent],
    );

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div
            ref={boardRef}
            className="w-full bg-white rounded-xl shadow-card overflow-hidden"
        >
            {/* Header del Board */}
            <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-100 flex items-center justify-between gap-2">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
                    {settings.name ?? "Board"}
                </h2>
                {showCreateButton ? (
                    <Button
                        icon={settings.buttonsName?.icon ?? "plus"}
                        text={settings.buttonsName?.create ?? "Crear"}
                        className="px-4 py-3 h-[40px] text-white bg-[#304FFD] hover:bg-[#263fca] rounded-[12px] shadow-[0_4px_0px_#263fca] flex items-center group relative"
                        iconClassName="text-white stroke-2 w-4"
                        onClick={handleOpenCreate}
                    />
                ) : null}
            </div>

            {/* Contenido del Board */}
            <div className="p-2 sm:p-4 lg:p-6">
                <Table
                    settings={settings}
                    rows={data}
                    loading={loading}
                    totalCount={totalCount}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </div>

            <Modal
                open={createModalOpen}
                title={`Creación ${settings.name ?? ""}`.trim()}
                size="small"
                onClose={handleCloseCreate}
            >
                <Form
                    settings={formSettings}
                    data={createFormData}
                    onCancel={handleCancelForm}
                    onSubmit={handleSubmitCreate}
                />
            </Modal>
        </div>
    );
}
