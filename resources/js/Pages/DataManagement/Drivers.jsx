import AppLayout from "../../Layouts/AppLayout";
import Drawer from "../../components/ui/Drawer";
import { useMemo, useState } from "react";
import {
    UserRoundKey,
    Trash2,
    Pencil,
    Search,
    MoreHorizontal,
} from "lucide-react";
import { TextInput, SelectInput } from "../../components/ui/Inputs";

// TODO: replace with real data from the backend (Inertia props / fetch)
const MOCK_DRIVERS = [
    {
        id: 1,
        name: "Arjay Santos",
        office: "Main Office",
        licenseExpiry: "2025-12-31",
        status: "Active",
    },
    {
        id: 2,
        name: "Maria Cruz",
        office: "North Branch",
        licenseExpiry: "2026-03-15",
        status: "Active",
    },
    {
        id: 3,
        name: "Pedro Reyes",
        office: "Main Office",
        licenseExpiry: "2025-09-01",
        status: "Expired",
    },
];

const STATUS_STYLES = {
    Active: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
    Expired: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
    Inactive: "bg-slate-100 text-slate-500 ring-1 ring-inset ring-slate-500/15",
};

function initials(name) {
    return name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

function StatusBadge({ status }) {
    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                STATUS_STYLES[status] ?? STATUS_STYLES.Inactive
            }`}
        >
            {status}
        </span>
    );
}

function Field({ label, htmlFor, children }) {
    return (
        <div className="mb-4">
            <label
                htmlFor={htmlFor}
                className="block text-[13px] font-medium tracking-wide text-slate-600 mb-1.5"
            >
                {label}
            </label>
            {children}
        </div>
    );
}

export default function Drivers() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return MOCK_DRIVERS;
        return MOCK_DRIVERS.filter((d) =>
            [d.name, d.office].some((v) => v.toLowerCase().includes(q)),
        );
    }, [query]);

    return (
        <AppLayout>
            <div className="p-4 sm:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                            Drivers
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Manage drivers, their office assignment, and license
                            status.
                        </p>
                    </div>
                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm shadow-blue-600/20 w-fit shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2"
                    >
                        <UserRoundKey size={17} />
                        <span>New Driver</span>
                    </button>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="relative flex-1 max-w-xs">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            type="text"
                            placeholder="Search by name or office..."
                            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                        />
                    </div>
                    <p className="text-xs text-slate-400 ml-auto hidden sm:block">
                        {filtered.length} of {MOCK_DRIVERS.length} drivers
                    </p>
                </div>

                {/* Table */}
                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                                        Name
                                    </th>
                                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                                        Office Assignment
                                    </th>
                                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                                        License Expiry
                                    </th>
                                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                                        Status
                                    </th>
                                    <th className="px-5 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filtered.map((driver) => (
                                    <tr
                                        key={driver.id}
                                        className="hover:bg-slate-50/80 transition-colors"
                                    >
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center shrink-0">
                                                    {initials(driver.name)}
                                                </div>
                                                <span className="text-sm font-medium text-slate-800">
                                                    {driver.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-sm text-slate-600 whitespace-nowrap">
                                            {driver.office}
                                        </td>
                                        <td className="px-5 py-3.5 text-sm text-slate-600 whitespace-nowrap">
                                            {driver.licenseExpiry}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <StatusBadge
                                                status={driver.status}
                                            />
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex justify-end gap-1.5">
                                                <button
                                                    className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                    aria-label={`Edit ${driver.name}`}
                                                >
                                                    <Pencil size={15} />
                                                </button>
                                                <button
                                                    className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                    aria-label={`Delete ${driver.name}`}
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                                <button
                                                    className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                                                    aria-label={`More actions for ${driver.name}`}
                                                >
                                                    <MoreHorizontal size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filtered.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-5 py-12 text-center"
                                        >
                                            <p className="text-sm font-medium text-slate-600">
                                                No drivers found
                                            </p>
                                            <p className="text-xs text-slate-400 mt-1">
                                                Try a different search, or add a
                                                new driver.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                title="Add New Driver"
                subtitle="Fill in the details of the new driver below."
                footer={
                    <div className="flex justify-end gap-2">
                        <button
                            className="px-4 py-2 text-sm font-medium border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </button>
                        <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
                            Save
                        </button>
                    </div>
                }
            >
                <p className="text-sm font-semibold text-slate-800 mb-4">
                    Details
                </p>

                <Field label="First Name" htmlFor="first_name">
                    <TextInput
                        id="first_name"
                        name="first_name"
                        placeholder="First name"
                    />
                </Field>
                <Field label="Last Name" htmlFor="last_name">
                    <TextInput
                        id="last_name"
                        name="last_name"
                        placeholder="Last name"
                    />
                </Field>
                <Field label="Middle Name" htmlFor="middle_name">
                    <TextInput
                        id="middle_name"
                        name="middle_name"
                        placeholder="Middle name"
                    />
                </Field>
                <Field label="Office Assignment" htmlFor="office">
                    <SelectInput
                        id="office"
                        name="office"
                        placeholder="Select office"
                    />
                </Field>
                <Field label="License Expiry Date" htmlFor="license_expiry">
                    <TextInput
                        id="license_expiry"
                        name="license_expiry"
                        type="date"
                        placeholder="License expiry date"
                    />
                </Field>
            </Drawer>
        </AppLayout>
    );
}
