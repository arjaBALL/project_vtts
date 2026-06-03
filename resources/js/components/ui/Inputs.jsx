export function TextInput({ label, error, className = "", ...props }) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-[13px] font-medium uppercase tracking-wide text-gray-400">
                    {label}
                </label>
            )}
            <input
                {...props}
                className={`w-full rounded-md border bg-gray-800/60 px-3 py-2 text-sm text-white placeholder-gray-500
                    border-gray-600
                    focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20
                    transition-colors duration-150
                    ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
                    ${className}`}
            />
            {error && (
                <p className="flex items-center gap-1 text-xs text-red-400">
                    <span>⚠</span> {error}
                </p>
            )}
        </div>
    );
}

export function SelectInput({
    label,
    error,
    className = "",
    children,
    ...props
}) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-[13px] font-medium uppercase tracking-wide text-gray-400">
                    {label}
                </label>
            )}
            <select
                {...props}
                className={`w-full rounded-md border bg-gray-800/60 px-3 py-2 text-sm text-white
                    border-gray-600
                    focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20
                    transition-colors duration-150
                    ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
                    ${className}`}
            >
                {children}
            </select>
            {error && (
                <p className="flex items-center gap-1 text-xs text-red-400">
                    <span>⚠</span> {error}
                </p>
            )}
        </div>
    );
}
