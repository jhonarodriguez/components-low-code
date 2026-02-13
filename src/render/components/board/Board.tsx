import React, { useMemo, useState } from "react";
import { BoardSettings } from "../../../core/types";
import { Table } from "../table/Table";
import { createDataFetcher } from "../../../core/data/factories/createDataFetcher";
import { FetchParams } from "../../../core/data/interfaces/FetchParams";
import { useBoardData } from "../../hooks/useBoardData";

export function Board({ settings }: { settings: BoardSettings }) {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(settings.rowsPerPage || 10);

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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (size: number) => {
        setRowsPerPage(size);
        setCurrentPage(1);
    };

    console.log("🚀 ~ Board ~ data:", data)

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>{settings.name ?? "Board"}</h2>
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
    );
}
