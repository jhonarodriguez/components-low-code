import React from "react";
import { BoardField } from "../../../core/types";

import "../../../styles/components/_tables.scss"

interface TableProps {
    columns: BoardField[];
    rows: any[];
    loading: Boolean;
}

export const Table = ({ columns, rows, loading }: TableProps) => {
    console.log("🚀 ~ Table ~ columns:", columns)
    return (
        <table className="w-full">
            <thead>
                <tr className="text-md font-semibold tracking-wide text-gray-500 bg-white uppercase text-center">
                    {columns.map((col, i) => (
                        <th key={col.key} className="select-none px-8 py-6 border titleColumn relative group">
                            {col.component?.name || col.name}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="text-center">
                {rows.map((row, i) => (
                    <tr key={i}>
                        {columns.map((col, i) => (
                            <td key={col.key} className="px-4 py-3 text-ms textCell border cursor-pointer">
                                <span>{renderCell(row, col)}</span>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

function renderCell(row: any, column: BoardField): React.ReactNode {
  const key = column?.component?.key || column.key;
  const value = key ? row?.[key] : "";

  // Por ahora solo texto
  if (value === null || value === undefined) return '-';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}
