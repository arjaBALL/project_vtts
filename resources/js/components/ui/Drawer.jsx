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
                className="absolute inset-0 bg-slate-900/40 dark:bg-black/60"
            />

            {/* Panel */}
            <div className="absolute inset-0 flex justify-end">
                <div className="w-full max-w-md bg-white dark:bg-slate-800 shadow-xl flex flex-col animate-slide-in">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                        {/* Top row */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-slate-900 dark:text-white font-semibold">
                                {title}
                            </h2>

                            <button
                                onClick={onClose}
                                className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Subtitle */}
                        {subtitle && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-4 overflow-y-auto flex-1 text-slate-700 dark:text-slate-200 scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent scrollbar-thumb-rounded-full hover:scrollbar-thumb-blue-500/40 scroll-smooth">
                        {children}
                    </div>

                    {footer && (
                        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
