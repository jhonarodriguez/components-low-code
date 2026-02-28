import React, { useMemo } from "react";
import { BtnActionConfig } from "../../../core/types";
import {
    ButtonVisibilityEvaluator,
    VisibilityContext,
} from "../../../core/validation/button";
import { Button } from "../ui/button";

export interface ActionButtonsCellProps {
    buttons: BtnActionConfig[];
    row: Record<string, unknown>;
    permissions: string[];
    actions: Record<string, unknown>;
    rows?: Record<string, unknown>[];
    evaluator: ButtonVisibilityEvaluator;
    onAction: (
        actionType: string,
        row: Record<string, unknown>,
        config: BtnActionConfig,
    ) => void;
}

export const ActionButtonsCell: React.FC<ActionButtonsCellProps> = ({
    buttons,
    row,
    permissions,
    actions,
    rows = [],
    evaluator,
    onAction,
}) => {
    const context: VisibilityContext = useMemo(
        () => ({ row, permissions, actions, rows }),
        [row, permissions, actions, rows],
    );

    const visibleButtons = useMemo(
        () => buttons.filter((btn) => evaluator.isVisible(btn, context)),
        [buttons, evaluator, context],
    );

    if (visibleButtons.length === 0) return null;

    const TABLE_BTN_CLASS =
        "relative flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#F8F8F8] hover:bg-[#C6C9CC] cursor-pointer group";

    const TABLE_ICON_CLASS =
        "text-[#595F69] group-hover:text-[#F8F8F8] stroke-2 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";

    return (
        <div className="flex items-center justify-center gap-1">
            {visibleButtons.map((btn) => (
                <Button
                    key={btn.key}
                    icon={btn.icon ?? ""}
                    className={btn.customClass ?? TABLE_BTN_CLASS}
                    iconClassName={TABLE_ICON_CLASS}
                    onClick={() => onAction(btn.actionType, row, btn)}
                />
            ))}
        </div>
    );
};
