import React, { useMemo } from "react";
import {
    ActionColumnPosition,
    ColumnField,
    TableSettings,
} from "../../../core/types";

import "../../../styles/components/_tables.scss";

interface TableProps {
    settings: TableSettings;
    rows: any[];
    loading: boolean;
    totalCount: number;
    currentPage: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (size: number) => void;
}

function resolveActionColumnPosition(
    position: unknown,
): ActionColumnPosition | null {
    if (position === "left" || position === "right") return position;
    return null;
}

type PageToken = number | "...";

function buildPaginationItems(
    totalPages: number,
    currentPage: number,
    pagesToShow = 5,
): PageToken[] {
    const pages: PageToken[] = [];

    if (totalPages <= pagesToShow) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
        return pages;
    }

    pages.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 2);

    if (currentPage === 1 || endPage < 5) endPage = 5;
    if (currentPage === totalPages || startPage > totalPages - 4) startPage = totalPages - 4;

    if (startPage > 2) pages.push("...");

    for (let i = startPage; i <= endPage; i++) pages.push(i);

    if (endPage < totalPages - 1) pages.push("...");

    pages.push(totalPages);
    return pages;
}

export const Table = ({
    rows,
    loading,
    settings,
    totalCount,
    currentPage,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
}: TableProps) => {
    const columns = useMemo(() => {
        return (settings.fields?.filter((f) => f.active !== false) ?? []).sort(
            (a, b) => (a?.order ?? 0) - (b?.order ?? 0),
        );
    }, [settings.fields]);

    const actionColumnPosition = useMemo(
        () => resolveActionColumnPosition(settings.actions?.position),
        [settings.actions?.position],
    );

    const showActionsColumn = actionColumnPosition !== null;

    const totalPages = Math.max(1, Math.ceil((totalCount || 0) / rowsPerPage));
    const safeTotalCount = Math.max(0, totalCount || 0);
    const hasRows = safeTotalCount > 0;

    const startIndex = hasRows ? (currentPage - 1) * rowsPerPage + 1 : 0;
    const endIndex = hasRows ? Math.min(currentPage * rowsPerPage, safeTotalCount) : 0;

    const pageItems = useMemo(
        () => buildPaginationItems(totalPages, currentPage, 5),
        [currentPage, totalPages],
    );

    const goToPage = (page: number) => {
        if (loading) return;
        if (page < 1 || page > totalPages || page === currentPage) return;
        onPageChange(page);
    };

    return (
        <>
            <table className="w-full">
                <thead>
                    <tr className="text-md font-semibold tracking-wide text-gray-500 bg-white uppercase text-center">
                        {showActionsColumn &&
                            actionColumnPosition === "left" && (
                                <th className="select-none px-8 py-6 border titleColumn">
                                    ACCIONES
                                </th>
                            )}

                        {columns.map((col, i) => (
                            <th
                                key={col.key}
                                className="select-none px-8 py-6 border titleColumn relative group"
                            >
                                {col.component?.name || col.name}
                            </th>
                        ))}

                        {showActionsColumn &&
                            actionColumnPosition === "right" && (
                                <th className="select-none px-8 py-6 border titleColumn">
                                    ACCIONES
                                </th>
                            )}
                    </tr>
                </thead>
                <tbody className="text-center">
                    {rows.map((row, i) => (
                        <tr key={i}>
                            {showActionsColumn &&
                                actionColumnPosition === "left" && (
                                    <td className="px-4 py-3 text-ms textCell border" />
                                )}
                            {columns.map((col, i) => (
                                <td
                                    key={col.key}
                                    className="px-4 py-3 text-ms textCell border cursor-pointer"
                                >
                                    <span>{renderCell(row, col)}</span>
                                </td>
                            ))}

                            {showActionsColumn &&
                                actionColumnPosition === "right" && (
                                    <td className="px-4 py-3 text-ms textCell border" />
                                )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="left-0 flex items-center justify-between border-gray-200 bg-white py-3 mt-4">
                <div className="flex flex-1 justify-between w-full sm:hidden">
                    <button
                        type="button"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={loading || currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-xl hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                            currentPage === 1 ? "text-[#8A9099]" : "text-[#304FFD] bg-[#e4e7f9]"
                        }`}
                    >
                        Anterior
                    </button>

                    <button
                        type="button"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={loading || currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-xl hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                            currentPage === totalPages
                                ? "text-[#8A9099]"
                                : "text-[#304FFD] bg-[#e4e7f9]"
                        }`}
                    >
                        Siguiente
                    </button>
                </div>

                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    {hasRows ? (
                        <div className="flex items-center">
                            <select
                                className="mr-4 py-3 px-4 ps-3 text-[15px] rounded-2xl text-[#8A9099] border border-[#E8E9EB] min-w-16"
                                value={rowsPerPage}
                                onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
                                disabled={loading}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={1000}>1000</option>
                            </select>

                            <p className="text-[15px] text-[#8A9099]">
                                <span className="font-medium">{startIndex}</span> -
                                <span className="font-medium"> {endIndex}</span> de
                                <span className="font-medium"> {safeTotalCount}</span>
                            </p>
                        </div>
                    ) : (
                        <div>
                            <p className="text-[15px] text-[#8A9099]">No hay resultados que mostrar</p>
                        </div>
                    )}

                    {hasRows ? (
                        <div style={{ maxWidth: 450 }}>
                            <nav
                                className="pagination-nav isolate inline-flex justify-between gap-1 rounded-md"
                                aria-label="Pagination"
                            >
                                <button
                                    type="button"
                                    onClick={() => goToPage(1)}
                                    disabled={loading || currentPage === 1}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-xl hover:bg-gray-50 ${
                                        currentPage === 1 ? "text-[#8A9099]" : "text-[#304FFD] bg-[#e4e7f9]"
                                    }`}
                                >
                                    «
                                </button>

                                <button
                                    type="button"
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={loading || currentPage === 1}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-xl hover:bg-gray-50 ${
                                        currentPage === 1 ? "text-[#8A9099]" : "text-[#304FFD] bg-[#e4e7f9]"
                                    }`}
                                >
                                    ‹
                                </button>

                                {pageItems.map((page, idx) =>
                                    page === "..." ? (
                                        <span key={`ellipsis-${idx}`} className="px-1 py-2">
                                            ...
                                        </span>
                                    ) : (
                                        <button
                                            key={page}
                                            type="button"
                                            onClick={() => goToPage(page)}
                                            disabled={loading}
                                            className={`relative inline-flex items-center px-4 py-2 text-[15px] font-normal rounded-xl ${
                                                currentPage === page
                                                    ? "bg-[#304FFD] text-white"
                                                    : "text-[#3F434A]"
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ),
                                )}

                                <button
                                    type="button"
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={loading || currentPage === totalPages}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-xl hover:bg-gray-50 ${
                                        currentPage === totalPages
                                            ? "text-[#8A9099]"
                                            : "text-[#304FFD] bg-[#e4e7f9]"
                                    }`}
                                >
                                    ›
                                </button>

                                <button
                                    type="button"
                                    onClick={() => goToPage(totalPages)}
                                    disabled={loading || currentPage === totalPages}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-xl hover:bg-gray-50 ${
                                        currentPage === totalPages
                                            ? "text-[#8A9099]"
                                            : "text-[#304FFD] bg-[#e4e7f9]"
                                    }`}
                                >
                                    »
                                </button>
                            </nav>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

function renderCell(row: any, column: ColumnField): React.ReactNode {
    const key = column?.component?.key || column.key;
    const value = key ? row?.[key] : "";

    // Por ahora solo texto
    if (value === null || value === undefined) return "-";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
}
