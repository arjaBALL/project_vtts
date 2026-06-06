import { useEffect } from "react";

export default function Drawer({
    open,
    onClose,
    title,
    children,
    subtitle,
    footer,
}) {
    // close on ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };

        if (open) {
            document.addEventListener("keydown", handleEsc);
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-gray-900/50"
            />

            {/* Panel */}
            <div className="absolute inset-0 flex justify-end">
                <div className="w-full max-w-md bg-gray-800 shadow-xl flex flex-col animate-slide-in">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-white/10">
                        {/* Top row */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-white font-semibold">
                                {title}
                            </h2>

                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Subtitle */}
                        {subtitle && (
                            <p className="text-xs text-gray-400 mt-1">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-4 overflow-y-auto flex-1 text-white scrollbar-thin scrollbar-thumb-indigo-500/20 scrollbar-track-transparent scrollbar-thumb-rounded-full hover:scrollbar-thumb-indigo-500/40 scroll-smooth">
                        {children}
                    </div>

                    {footer && (
                        <div className="px-4 py-3 border-t border-white/10 bg-gray-800">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
