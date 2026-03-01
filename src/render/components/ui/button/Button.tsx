import React, { useCallback } from "react";
import { getIconComponent } from "../icons/iconRegistry";

interface ButtonProps {
    icon?: string;
    text?: string;
    className?: string;
    iconClassName?: string;
    disabled?: boolean;
    loading?: boolean;
    onClick: () => void;
}

const BASE_CLASS = "px-4 py-3 h-[40px] text-white bg-[#304FFD] hover:bg-[#263fca] rounded-[12px] shadow-[0_4px_0px_#263fca] flex items-center group relative";

const DEFAULT_ICON_CLASS =
    "text-[#595F69] group-hover:text-[#F8F8F8] stroke-2 w-4";

export const Button: React.FC<ButtonProps> = ({
    icon,
    text,
    className,
    iconClassName = DEFAULT_ICON_CLASS,
    disabled = false,
    loading = false,
    onClick,
}) => {
    const IconComp = icon ? getIconComponent(icon) : null;

    const handleClick = useCallback(() => {
        if (!disabled && !loading) onClick();
    }, [disabled, loading, onClick]);

    const resolvedClass = className ?? BASE_CLASS;

    return (
        <button
            type="button"
            className={`${resolvedClass} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            onClick={handleClick}
            disabled={disabled || loading}
        >
            {IconComp ? <IconComp className={iconClassName} /> : null}
            {text && (
                <span className={IconComp ? "ml-2" : ""}>
                    {text}
                </span>
            )}
        </button>
    );
};
