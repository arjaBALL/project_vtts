import AppLayout from "../../Layouts/AppLayout";
import { PageHeader } from "../../components/ui/PageHeader";
import {
    ShieldCheck,
    Users,
    SlidersHorizontal,
    FlaskConical,
} from "lucide-react";
import { useState } from "react";

const tabs = [
    {
        name: "Role matrix",
        icon: ShieldCheck,
        href: "#role-matrix",
        description: "See which roles exist and what each one can access.",
    },
    {
        name: "User assignments",
        icon: Users,
        href: "#user-assignments",
        description: "See which users hold which roles.",
    },
    {
        name: "Overrides",
        icon: SlidersHorizontal,
        href: "#overrides",
        description:
            "See permission exceptions granted outside the role matrix.",
    },
    {
        name: "Access simulator",
        icon: FlaskConical,
        href: "#access-simulator",
        description:
            "Check what a specific user can and can't do before you change anything.",
    },
];

export default function ManageUserAccess() {
    const [active, setActive] = useState(tabs[0].name);

    return (
        <AppLayout>
            <div className="p-4 sm:p-6">
                {/* Header */}
                <div className="mb-6">
                    <PageHeader
                        title="Manage User Access"
                        description="Manage user permissions, assignments, overrides, and access policies."
                    />
                </div>

                {/* Mobile tab selector */}
                <div className="mb-6 sm:hidden">
                    <label htmlFor="access-tabs" className="sr-only">
                        Select access management section
                    </label>

                    <select
                        id="access-tabs"
                        className="block w-full rounded-lg border border-default-medium bg-neutral-primary-soft px-3 py-2.5 text-sm text-heading shadow-xs focus:border-brand focus:ring-brand"
                        value={active}
                        onChange={(e) => setActive(e.target.value)}
                    >
                        {tabs.map((tab) => (
                            <option key={tab.name} value={tab.name}>
                                {tab.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Desktop tabs — underline style, sits quietly next to the sidebar */}
                <nav
                    aria-label="Access management"
                    className="hidden border-b border-default sm:block"
                >
                    <ul className="flex items-center gap-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = tab.name === active;

                            return (
                                <li key={tab.name}>
                                    <a
                                        href={tab.href}
                                        aria-current={
                                            isActive ? "page" : undefined
                                        }
                                        onClick={() => setActive(tab.name)}
                                        className={[
                                            "group relative inline-flex items-center gap-2",
                                            "px-3 py-3 text-sm font-medium",
                                            "transition-colors duration-150",
                                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                                            isActive
                                                ? "text-brand"
                                                : "text-subtle hover:text-heading",
                                        ].join(" ")}
                                    >
                                        <Icon
                                            className={[
                                                "h-4 w-4 shrink-0 transition-colors duration-150",
                                                isActive
                                                    ? "text-brand"
                                                    : "text-subtle group-hover:text-heading",
                                            ].join(" ")}
                                            aria-hidden="true"
                                        />
                                        <span>{tab.name}</span>

                                        {/* active indicator */}
                                        <span
                                            className={[
                                                "absolute inset-x-0 -bottom-px h-0.5 rounded-full transition-opacity duration-150",
                                                isActive
                                                    ? "bg-brand opacity-100"
                                                    : "opacity-0",
                                            ].join(" ")}
                                            aria-hidden="true"
                                        />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Tab panels */}
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = tab.name === active;

                    if (!isActive) return null;

                    return (
                        <div
                            key={tab.name}
                            id={tab.href.slice(1)}
                            role="tabpanel"
                            className="flex min-h-[420px] flex-col items-center justify-center gap-3 px-4 py-16 text-center"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-secondary-medium">
                                <Icon
                                    className="h-5 w-5 text-subtle"
                                    aria-hidden="true"
                                />
                            </div>
                            <h2 className="text-sm font-medium text-heading">
                                {tab.name}
                            </h2>
                            <p className="max-w-sm text-sm text-subtle">
                                {tab.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </AppLayout>
    );
}
