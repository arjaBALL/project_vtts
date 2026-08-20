export function Card({ title, description, children, className = "" }) {
    return (
        <section
            className={`overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${className}`}
        >
            {(title || description) && (
                <div className="border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
                    {title && (
                        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                            {description}
                        </p>
                    )}
                </div>
            )}
            <div className="px-5 py-5">{children}</div>
        </section>
    );
}
