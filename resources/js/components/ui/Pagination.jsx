import { router } from "@inertiajs/react";

export default function Pagination({ links = [] }) {
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

    return (
        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-200 dark:border-slate-700">
            {/* Previous */}
            <button
                type="button"
                disabled={!links[0].url}
                onClick={() => goTo(links[0].url)}
                className="px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
                dangerouslySetInnerHTML={{
                    __html: links[0].label
                        .replace("&laquo;", "«")
                        .replace("&raquo;", "»"),
                }}
            />

            {/* Page numbers */}
            <div className="flex items-center gap-1">
                {links.slice(1, -1).map((link, index) => (
                    <button
                        key={index}
                        type="button"
                        disabled={!link.url}
                        onClick={() => goTo(link.url)}
                        className={`
                            min-w-9 h-9 px-3 rounded-lg text-sm font-medium
                            ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : link.url
                                      ? "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                      : "text-slate-400 cursor-default"
                            }
                        `}
                        dangerouslySetInnerHTML={{
                            __html: link.label,
                        }}
                    />
                ))}
            </div>

            {/* Next */}
            <button
                type="button"
                disabled={!links[links.length - 1].url}
                onClick={() => goTo(links[links.length - 1].url)}
                className="px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
                dangerouslySetInnerHTML={{
                    __html: links[links.length - 1].label
                        .replace("&laquo;", "«")
                        .replace("&raquo;", "»"),
                }}
            />
        </div>
    );
}
