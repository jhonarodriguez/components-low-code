import React, { useMemo, useState } from "react";
import { BoardSettings } from "../../../core/types";
import { Table } from "../table/Table";
import { createDataFetcher } from "../../../core/data/factories/createDataFetcher";
import { FetchParams } from "../../../core/data/interfaces/FetchParams";
import { useBoardData } from "../../hooks/useBoardData";

export function Board({ settings }: { settings: BoardSettings }) {
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
            from: 0,
            size: settings.rowsPerPage || 10,
            method: "GET"
        }),
        [settings],
    );

    const { data, totalCount, loading, error } = useBoardData(fetcher, params);
    console.log("🚀 ~ Board ~ data:", data)

    const columns = useMemo(() => {
        return (settings.fields?.filter((f) => f.active !== false) ?? []).sort(
            (a, b) => (a?.order ?? 0) - (b?.order ?? 0),
        );
    }, [settings.fields]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>{settings.name ?? "Board"}</h2>
            <Table
                columns={columns}
                rows={data}
                loading={loading}
                totalCount={totalCount}
            />
        </div>
    );
}
