import { router } from "@inertiajs/react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export default function Pagination({ links = [], meta = null }) {
    if (links.length <= 3) {
        return null;
    }

    const goTo = (url) => {
        if (!url) return;

        router.get(
            url,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const prev = links[0];
    const next = links[links.length - 1];
    const pages = links.slice(1, -1);

    // Collapse long page lists to: 1 … 4 5 [6] 7 8 … 20
    const visiblePages = [];
    pages.forEach((link, index) => {
        const isEdge = index === 0 || index === pages.length - 1;
        const isNearActive =
            pages[index].active ||
            (pages[index - 1]?.active ?? false) ||
            (pages[index + 1]?.active ?? false) ||
            Math.abs(pages.findIndex((p) => p.active) - index) <= 1;

        if (isEdge || isNearActive || pages.length <= 7) {
            visiblePages.push({ ...link, key: index });
        } else if (visiblePages[visiblePages.length - 1]?.type !== "ellipsis") {
            visiblePages.push({ type: "ellipsis", key: `ellipsis-${index}` });
        }
    });

    const navButtonClasses =
        "flex items-center justify-center w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:focus-visible:ring-blue-400/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800";

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            {meta && (
                <p className="text-xs text-slate-500 dark:text-slate-400 order-2 sm:order-1">
                    Showing{" "}
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                        {meta.from ?? 0}
                    </span>
                    –
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                        {meta.to ?? 0}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                        {meta.total ?? 0}
                    </span>{" "}
                    results
                </p>
            )}

            <div className="flex items-center gap-1 order-1 sm:order-2">
                {/* Previous */}
                <button
                    type="button"
                    disabled={!prev.url}
                    onClick={() => goTo(prev.url)}
                    aria-label="Previous page"
                    className={navButtonClasses}
                >
                    <ChevronLeft size={16} />
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                    {visiblePages.map((link) =>
                        link.type === "ellipsis" ? (
                            <span
                                key={link.key}
                                className="flex items-center justify-center w-7 h-7 text-slate-400 dark:text-slate-500"
                            >
                                <MoreHorizontal size={16} />
                            </span>
                        ) : (
                            <button
                                key={link.key}
                                type="button"
                                disabled={!link.url}
                                onClick={() => goTo(link.url)}
                                aria-current={link.active ? "page" : undefined}
                                className={`flex items-center justify-center min-w-7 h-7 px-2 rounded-lg text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:focus-visible:ring-blue-400/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 ${
                                    link.active
                                        ? "bg-blue-600 dark:bg-blue-500 text-white shadow-sm shadow-blue-600/20 dark:shadow-blue-500/30"
                                        : link.url
                                          ? "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                          : "text-slate-300 dark:text-slate-600 cursor-default"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ),
                    )}
                </div>

                {/* Next */}
                <button
                    type="button"
                    disabled={!next.url}
                    onClick={() => goTo(next.url)}
                    aria-label="Next page"
                    className={navButtonClasses}
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}
