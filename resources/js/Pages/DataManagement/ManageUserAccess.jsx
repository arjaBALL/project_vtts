import AppLayout from "../../Layouts/AppLayout";
import { PageHeader } from "../../components/ui/PageHeader";
import Drawer from "../../components/ui/Drawer";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useForm, router } from "@inertiajs/react";
import {
    ShieldCheck,
    Users,
    SlidersHorizontal,
    FlaskConical,
    Search,
} from "lucide-react";
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

const updates = [
    {
        user: "John Doe",
        module: "User Management",
        update: "Updated role",
        reason: "Promotion",
    },
    {
        user: "Jane Smith",
        module: "Reports",
        update: "Changed permissions",
        reason: "Access requirement",
    },
];

const PERMISSION_KEYS = ["view", "add", "update", "delete"];

function RoleMatrix({ initialRoles }) {
    const [roles, setRoles] = useState(initialRoles ?? []);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setRoles(initialRoles ?? []);
    }, [initialRoles]);

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

    const handleSave = () => {
        setSaving(true);
        router.put(
            "/role-permissions/matrix",
            { roles },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Role permissions updated successfully");
                },
                onError: () => {
                    toast.error("Failed to update role permissions");
                },
                onFinish: () => setSaving(false),
            },
        );
    };

    const handlsearch = (e) => {
        const value = e.target.value;

        setQuery(value);

        router.get(
            "role-permissions",
            {
                search: value,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
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
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */

function UserAssignments() {
    const users = [
        {
            id: 1,
            initials: "JD",
            name: "Juan Dela Cruz",
            email: "juan.delacruz@example.com",
            role: "",
            avatarClass:
                "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
        },
        {
            id: 2,
            initials: "MS",
            name: "Maria Santos",
            email: "maria.santos@example.com",
            role: "",
            avatarClass:
                "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
        },
    ];

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            User Assignments
                        </h2>

                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                            {users.length} users
                        </span>
                    </div>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Assign roles and manage user access permissions.
                    </p>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                >
                    Save changes
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-sm">
                    <Search
                        size={16}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-500 dark:focus:bg-slate-800"
                    />
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Active assignments
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                        <thead className="bg-slate-50 dark:bg-slate-800/60">
                            <tr>
                                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    User
                                </th>

                                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Assigned role
                                </th>

                                <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                                >
                                    {/* User */}
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${user.avatarClass}`}
                                            >
                                                {user.initials}
                                            </span>

                                            <div>
                                                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                                                    {user.name}
                                                </p>

                                                <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Role */}
                                    <td className="px-6 py-4">
                                        <div className="w-[220px]">
                                            <SelectInput
                                                id={`role-${user.id}`}
                                                name={`role-${user.id}`}
                                                placeholder="Select role"
                                                className="w-full"
                                            >
                                                <option value="">
                                                    Select role
                                                </option>
                                                <option value="admin">
                                                    Admin
                                                </option>
                                                <option value="staff">
                                                    Staff
                                                </option>
                                                <option value="user">
                                                    User
                                                </option>
                                                <option value="driver">
                                                    Driver
                                                </option>
                                            </SelectInput>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="whitespace-nowrap px-6 py-4 text-right">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                            Unassigned
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="flex flex-col gap-2 border-t border-slate-200 bg-slate-50/50 px-6 py-3.5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-slate-800/30">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Showing {users.length} of {users.length} users
                    </p>

                    <p className="text-xs text-slate-400 dark:text-slate-500">
                        Changes are saved when you click Save changes.
                    </p>
                </div>
            </div>
        </div>
    );
}

function Overrides() {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
            {/* Header */}
            <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700">
                <div>
                    <h2 className="text-lg font-semibold text-heading">
                        Overrides
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

            <table className="min-w-full table-fixed text-left">
                <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-800/50">
                        {["User", "Module", "Update", "Reason", ""].map(
                            (heading) => (
                                <th
                                    key={heading}
                                    className={`whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ${
                                        heading === "User"
                                            ? "w-72 border-r border-slate-200 dark:border-slate-700"
                                            : ""
                                    } ${
                                        heading === "Reason"
                                            ? "min-w-55"
                                            : "text-center"
                                    }`}
                                >
                                    {heading}
                                </th>
                            ),
                        )}
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {updates.map((item, index) => (
                        <tr
                            key={item.id ?? index}
                            className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                            {/* User */}
                            <td className="w-72 border-r border-slate-200 px-6 py-4 dark:border-slate-700">
                                <div className="truncate font-medium text-slate-900 dark:text-white">
                                    {item.user}
                                </div>
                            </td>

                            {/* Module */}
                            <td className="w-48 px-6 py-4 text-center text-sm text-slate-600 dark:text-slate-400">
                                <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                                    {item.module}
                                </span>
                            </td>

                            {/* Update */}
                            <td className="w-56 px-6 py-4 text-center text-sm font-medium text-slate-700 dark:text-slate-300">
                                {item.update}
                            </td>

                            {/* Reason */}
                            <td className="min-w-55 px-6 py-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                {item.reason}
                            </td>

                            <td className="w-32 px-6 py-4 text-center">
                                <button
                                    type="button"
                                    onClick={() => handleRemove(item.id)}
                                    className="inline-flex items-center rounded-md border border-red-200 px-3 py-1 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30 dark:hover:text-red-300 dark:focus:ring-offset-slate-900"
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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

export default function ManageUserAccess({ roles, filters }) {
    const [active, setActive] = useState(tabs[0].name);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState(filters?.search ?? "");
    const [ticketToEdit, setTicketToEdit] = useState(null);

    const {
        data,
        post,
        setData,
        processing,
        errors,
        setError,
        put,
        patch,
        clearErrors,
        reset,
    } = useForm({
        driver_id: "",
        vehicle_id: "",
        status: "approve",
    });

    const handleSaveRoleAccess = (e) => {
        e.preventDefault();
    };

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
                    {active === "Role matrix" && (
                        <RoleMatrix initialRoles={roles} />
                    )}

                    {active === "User assignments" && <UserAssignments />}

                    {active === "Overrides" && <Overrides />}

                    {active === "Access simulator" && <AccessSimulator />}
                </div>
            </div>

            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                title={ticketToEdit ? "Update Ticket" : "Add New Ticket"}
                subtitle={
                    ticketToEdit
                        ? "Update the ticket's information below."
                        : "Fill in the details of the new ticket below."
                }
                footer={
                    <div className="flex justify-end gap-2">
                        <button
                            className="px-4 py-2 text-sm font-medium border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20 disabled:opacity-50"
                        >
                            {processing
                                ? "Saving..."
                                : ticketToEdit
                                  ? "Update"
                                  : "Save"}
                        </button>
                    </div>
                }
            >
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Ticket info
                </p>
            </Drawer>
        </AppLayout>
    );
}
