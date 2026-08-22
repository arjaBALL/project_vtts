import { useId } from "react";

/**
 * Shared visual styles for all form controls.
 * Kept in one place so every input stays visually consistent
 * and future style tweaks only need to happen once.
 */
function fieldClasses({ error, disabled, extra = "", className = "" }) {
    return `
        w-full rounded-lg border
        bg-white px-3 py-2.5
        text-sm text-zinc-900
        placeholder-zinc-400
        border-zinc-200

        focus:border-teal-500
        focus:outline-none
        focus:ring-2
        focus:ring-teal-500/10

        transition-colors duration-150

        dark:border-zinc-700
        dark:bg-zinc-900
        dark:text-zinc-100
        dark:placeholder-zinc-500
        dark:focus:border-teal-400
        dark:focus:ring-teal-400/10

        disabled:cursor-not-allowed
        disabled:opacity-60
        disabled:bg-zinc-50
        dark:disabled:bg-zinc-800/60

        ${
            error
                ? `
                border-red-500
                focus:border-red-500
                focus:ring-red-500/10
                dark:border-red-500
                dark:focus:border-red-500
                dark:focus:ring-red-500/10
            `
                : ""
        }

        ${extra}
        ${className}
    `;
}

function FieldLabel({ id, label, required }) {
    if (!label) return null;
    return (
        <label
            htmlFor={id}
            className="text-[13px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
        >
            {label}
            {required && (
                <span
                    className="ml-0.5 text-red-500 dark:text-red-400"
                    aria-hidden="true"
                >
                    *
                </span>
            )}
        </label>
    );
}

function FieldError({ id, error }) {
    if (!error) return null;
    return (
        <p
            id={id}
            className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400"
        >
            <span aria-hidden="true">⚠</span>
            {error}
        </p>
    );
}

export function TextInput({
    label,
    error,
    className = "",
    id,
    required,
    disabled,
    ...props
}) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
        <div className="flex flex-col gap-1.5">
            <FieldLabel id={inputId} label={label} required={required} />

            <input
                id={inputId}
                disabled={disabled}
                required={required}
                aria-invalid={!!error}
                aria-describedby={errorId}
                {...props}
                className={fieldClasses({ error, disabled, className })}
            />

            <FieldError id={errorId} error={error} />
        </div>
    );
}

export function NumberInput({
    label,
    error,
    className = "",
    id,
    required,
    disabled,
    min,
    max,
    step = 1,
    ...props
}) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
        <div className="flex flex-col gap-1.5">
            <FieldLabel id={inputId} label={label} required={required} />

            <input
                id={inputId}
                type="number"
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                required={required}
                aria-invalid={!!error}
                aria-describedby={errorId}
                {...props}
                className={fieldClasses({
                    error,
                    disabled,
                    className,
                    extra: `
                        [appearance:textfield]
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none
                    `,
                })}
            />

            <FieldError id={errorId} error={error} />
        </div>
    );
}

export function SelectInput({
    label,
    error,
    className = "",
    id,
    required,
    disabled,
    children,
    ...props
}) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
        <div className="flex flex-col gap-1.5">
            <FieldLabel id={inputId} label={label} required={required} />

            <select
                id={inputId}
                disabled={disabled}
                required={required}
                aria-invalid={!!error}
                aria-describedby={errorId}
                {...props}
                className={fieldClasses({ error, disabled, className })}
            >
                {children}
            </select>

            <FieldError id={errorId} error={error} />
        </div>
    );
}

export function DateInput({
    label,
    error,
    className = "",
    id,
    required,
    disabled,
    min,
    max,
    ...props
}) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
        <div className="flex flex-col gap-1.5">
            <FieldLabel id={inputId} label={label} required={required} />

            <input
                id={inputId}
                type="date"
                min={min}
                max={max}
                disabled={disabled}
                required={required}
                aria-invalid={!!error}
                aria-describedby={errorId}
                {...props}
                className={fieldClasses({ error, disabled, className })}
            />

            <FieldError id={errorId} error={error} />
        </div>
    );
}

export function TextArea({
    label,
    error,
    className = "",
    id,
    required,
    disabled,
    rows = 4,
    ...props
}) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
        <div className="flex flex-col gap-1.5">
            <FieldLabel id={inputId} label={label} required={required} />

            <textarea
                id={inputId}
                rows={rows}
                disabled={disabled}
                required={required}
                aria-invalid={!!error}
                aria-describedby={errorId}
                {...props}
                className={fieldClasses({
                    error,
                    disabled,
                    className,
                    extra: "resize-y",
                })}
            />

            <FieldError id={errorId} error={error} />
        </div>
    );
}
