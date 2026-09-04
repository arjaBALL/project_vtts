import AppLayout from "../../Layouts/AppLayout";
import { PageHeader } from "../../components/ui/PageHeader";
import {
    ShieldCheck,
    Users,
    SlidersHorizontal,
    FlaskConical,
    Search,
} from "lucide-react";
import { useState } from "react";
import {
    TextInput,
    SelectInput,
    PasswordInput,
} from "../../components/ui/Inputs";

function Field({ label, htmlFor, children }) {
    return (
        <div className="mb-4">
            <label
                htmlFor={htmlFor}
                className="block text-[13px] font-medium tracking-wide text-slate-600 dark:text-slate-300 mb-1.5"
            >
                {label}
            </label>
            {children}
        </div>
    );
}

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

/* ------------------------------------------------------------------ */
/* Role Matrix — data-driven                                          */
/* ------------------------------------------------------------------ */

// One place to define roles, badge colors, and each module's permissions.
// Add/remove a role or module here — the table markup never changes.
const ROLE_BADGE_CLASSES = {
    Admin: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300",
    Staff: "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400",
    User: "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
    Driver: "bg-orange-50 text-zinc-700 dark:bg-zinc-500/10 dark:text-zinc-400",
};

const INITIAL_ROLES = [
    {
        name: "Admin",
        modules: [
            {
                name: "Dashboard",
                view: true,
                add: true,
                update: true,
                delete: true,
            },
            {
                name: "My Tripticket",
                view: true,
                add: true,
                update: true,
                delete: true,
            },
            {
                name: "Review & Assign",
                view: true,
                add: true,
                update: true,
                delete: true,
            },
            {
                name: "Assigned Trips",
                view: true,
                add: true,
                update: true,
                delete: true,
            },
            {
                name: "Drivers",
                view: true,
                add: true,
                update: true,
                delete: true,
            },
            {
                name: "Users",
                view: true,
                add: true,
                update: true,
                delete: true,
            },
            {
                name: "Vehicles",
                view: true,
                add: true,
                update: true,
                delete: true,
            },
            {
                name: "Manage User Access",
                view: true,
                add: true,
                update: true,
                delete: true,
            },
        ],
    },
    {
        name: "Staff",
        modules: [
            {
                name: "Dashboard",
                view: true,
                add: true,
                update: true,
                delete: false,
            },
            {
                name: "My Tripticket",
                view: true,
                add: false,
                update: false,
                delete: false,
            },
            {
                name: "Review & Assign",
                view: true,
                add: false,
                update: false,
                delete: false,
            },
            {
                name: "Assigned Trips",
                view: true,
                add: false,
                update: false,
                delete: false,
            },
        ],
    },
    {
        name: "User",
        modules: [
            {
                name: "Dashboard",
                view: true,
                add: false,
                update: false,
                delete: false,
            },
            {
                name: "My Tripticket",
                view: true,
                add: false,
                update: false,
                delete: false,
            },
        ],
    },
    {
        name: "Driver",
        modules: [
            {
                name: "Dashboard",
                view: true,
                add: false,
                update: false,
                delete: false,
            },
            {
                name: "Assign trips",
                view: false,
                add: false,
                update: false,
                delete: false,
            },
        ],
    },
];

const PERMISSION_KEYS = ["view", "add", "update", "delete"];

function RoleMatrix() {
    const [roles, setRoles] = useState(INITIAL_ROLES);

    const togglePermission = (roleIdx, moduleIdx, key) => {
        setRoles((prev) =>
            prev.map((role, ri) =>
                ri !== roleIdx
                    ? role
                    : {
                          ...role,
                          modules: role.modules.map((mod, mi) =>
                              mi !== moduleIdx
                                  ? mod
                                  : { ...mod, [key]: !mod[key] },
                          ),
                      },
            ),
        );
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
            {/* Header */}
            <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Role Permissions
                    </h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Manage access to modules and available actions.
                    </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Changes are saved automatically
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-800/50">
                            {[
                                "Role",
                                "Module",
                                "View",
                                "Add",
                                "Update",
                                "Delete",
                            ].map((heading) => (
                                <th
                                    key={heading}
                                    className={`whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ${
                                        heading === "Role"
                                            ? "w-32 border-r border-slate-200 dark:border-slate-700"
                                            : ""
                                    } ${
                                        heading === "Module"
                                            ? "min-w-[220px]"
                                            : "text-center"
                                    }`}
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {roles.map((role, roleIdx) =>
                            role.modules.map((mod, modIdx) => (
                                <tr
                                    key={`${role.name}-${mod.name}`}
                                    className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                >
                                    {modIdx === 0 && (
                                        <td
                                            rowSpan={role.modules.length}
                                            className="whitespace-nowrap border-r border-slate-200 px-4 py-2 text-center text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-300"
                                        >
                                            <span
                                                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                                                    ROLE_BADGE_CLASSES[
                                                        role.name
                                                    ] ??
                                                    "bg-slate-50 text-slate-700 dark:bg-slate-500/10 dark:text-slate-300"
                                                }`}
                                            >
                                                {role.name}
                                            </span>
                                        </td>
                                    )}

                                    <td className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400">
                                        {mod.name}
                                    </td>

                                    {PERMISSION_KEYS.map((key) => (
                                        <td
                                            key={key}
                                            className="px-4 py-2 text-center"
                                        >
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 cursor-pointer rounded border-slate-300 text-indigo-600 accent-indigo-600 focus:ring-2 focus:ring-indigo-500 dark:border-slate-600"
                                                checked={mod[key]}
                                                onChange={() =>
                                                    togglePermission(
                                                        roleIdx,
                                                        modIdx,
                                                        key,
                                                    )
                                                }
                                            />
                                        </td>
                                    ))}
                                </tr>
                            )),
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    Review permissions carefully before making changes.
                </p>

                <button
                    type="button"
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */

function UserAssignments() {
    return (
        <div className="rounded-lg ">
            <div className="flex items-center justify-between gap-4 flex-wrap my-4">
                <div className="relative flex-1 max-w-xs">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <input
                        type="text"
                        placeholder="Search by name or office..."
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                    />
                </div>
            </div>

            {/* Your role matrix table goes here */}
            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm dark:border-slate-700">
                <table className="min-w-full table-fixed divide-y divide-slate-200 text-center dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-900/40">
                        <tr>
                            {["User", "Assigned Role"].map((heading) => (
                                <th
                                    key={heading}
                                    className="whitespace-nowrap px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-700/60 dark:bg-slate-900">
                        {/* Sample UI Row */}
                        <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60">
                            <td className="whitespace-nowrap px-5 py-4">
                                <div className="flex items-center justify-center gap-2.5">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                        JD
                                    </span>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Juan Dela Cruz
                                    </span>
                                </div>
                            </td>

                            <td className="whitespace-nowrap ">
                                <div className="flex justify-center">
                                    <SelectInput
                                        id="role-1"
                                        name="role"
                                        placeholder="Select role"
                                        className="w-40"
                                    >
                                        <option value="">Select role</option>
                                        <option value="admin">Admin</option>
                                        <option value="staff">Staff</option>
                                        <option value="user">User</option>
                                        <option value="driver">Driver</option>
                                    </SelectInput>
                                </div>
                            </td>
                        </tr>

                        {/* Second Sample Row */}
                        <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60">
                            <td className="whitespace-nowrap px-5 py-4">
                                <div className="flex items-center justify-center gap-2.5">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                        MS
                                    </span>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Maria Santos
                                    </span>
                                </div>
                            </td>

                            <td className="whitespace-nowrap m">
                                <div className="flex justify-center">
                                    <SelectInput
                                        id="role-2"
                                        name="role"
                                        placeholder="Select role"
                                        className="w-40"
                                    >
                                        <option value="">Select role</option>
                                        <option value="admin">Admin</option>
                                        <option value="staff">Staff</option>
                                        <option value="user">User</option>
                                        <option value="driver">Driver</option>
                                    </SelectInput>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function Overrides() {
    return (
        <div className="rounded-lg border border-default p-6">
            <h2 className="text-lg font-semibold text-heading">Overrides</h2>
            <p className="mt-1 text-sm text-subtle">
                Manage permission exceptions outside the role matrix.
            </p>

            {/* Your overrides table goes here */}
        </div>
    );
}

function AccessSimulator() {
    return (
        <div className="rounded-lg border border-default p-6">
            <h2 className="text-lg font-semibold text-heading">
                Access Simulator
            </h2>
            <p className="mt-1 text-sm text-subtle">
                Check what a specific user can access.
            </p>

            {/* Your access simulator UI goes here */}
        </div>
    );
}

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
                <div className="mt-2">
                    {active === "Role matrix" && <RoleMatrix />}

                    {active === "User assignments" && <UserAssignments />}

                    {active === "Overrides" && <Overrides />}

                    {active === "Access simulator" && <AccessSimulator />}
                </div>
            </div>
        </AppLayout>
    );
}
