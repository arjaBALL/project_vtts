export function PageHeader({ title, description, breadcrumbs }) {
    return (
        <div className="">
            <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                {title}
            </h1>
            {description && (
                <p className="mt-0 text-sm text-zinc-600 dark:text-zinc-300">
                    {description}
                </p>
            )}
        </div>
    );
}
