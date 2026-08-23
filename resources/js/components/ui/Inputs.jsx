import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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

            <div className="relative">
                <select
                    id={inputId}
                    disabled={disabled}
                    required={required}
                    aria-invalid={!!error}
                    aria-describedby={errorId}
                    {...props}
                    className={fieldClasses({
                        error,
                        disabled,
                        className: `appearance-none pr-10 ${className ?? ""}`,
                    })}
                >
                    {children}
                </select>

                <svg
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>

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

export function PasswordInput({
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

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col gap-1.5">
            <FieldLabel id={inputId} label={label} required={required} />

            <div className="relative">
                <input
                    id={inputId}
                    type={showPassword ? "text" : "password"}
                    disabled={disabled}
                    required={required}
                    aria-invalid={!!error}
                    aria-describedby={errorId}
                    {...props}
                    className={fieldClasses({
                        error,
                        disabled,
                        className: `pr-10 ${className}`,
                    })}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={disabled}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={
                        showPassword ? "Hide password" : "Show password"
                    }
                >
                    {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                    ) : (
                        <Eye className="h-5 w-5" />
                    )}
                </button>
            </div>

            <FieldError id={errorId} error={error} />
        </div>
    );
}
