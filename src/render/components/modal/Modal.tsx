import React, { useEffect } from "react";
import { ModalSize } from "../../../core/types";

interface ModalProps {
    open: boolean;
    title?: string;
    loading?: boolean;
    size?: ModalSize;
    onClose: () => void;
    children: React.ReactNode;
}

const SIZE_CLASS_MAP: Record<ModalSize, string> = {
    small: "max-w-md",
    medium: "max-w-2xl",
    large: "max-w-4xl",
    fullscreen: "max-w-[95vw] h-[95vh]",
    auto: "max-w-3xl",
};

export const Modal: React.FC<ModalProps> = ({
    open,
    title,
    loading = false,
    size = "auto",
    onClose,
    children,
}) => {
    useEffect(() => {
        if (!open) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[2000] bg-black/50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className={`w-full ${SIZE_CLASS_MAP[size]} bg-white rounded-xl shadow-card p-4 sm:p-6`}
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between gap-2">
                    <h2 className="text-[22px] font-medium text-[#3F434A]">
                        {(title ?? "").toUpperCase()}
                    </h2>
                    <button
                        type="button"
                        className="cursor-pointer text-[#3F434A] bg-[#F8F8F8] hover:bg-gray-100 rounded-lg text-lg w-8 h-8 inline-flex justify-center items-center"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center mt-8 mb-4 text-[#8A9099]">
                        Cargando...
                    </div>
                ) : (
                    <div className="mt-4">{children}</div>
                )}
            </div>
        </div>
    );
};
