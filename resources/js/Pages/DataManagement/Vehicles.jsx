import AppLayout from "../../Layouts/AppLayout";
import Drawer from "../../components/ui/Drawer";
import { useMemo, useState } from "react";
import { useForm, router } from "@inertiajs/react";
import { Trash2, Pencil, CarFront, Search, MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { PageHeader } from "../../components/ui/PageHeader";
import Pagination from "../../components/ui/Pagination";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import {
    TextInput,
    SelectInput,
    NumberInput,
} from "../../components/ui/Inputs";

const STATUS_STYLES = {
    active: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30",
    under_maintenance:
        "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/30",
    inactive:
        "bg-slate-100 text-slate-500 ring-1 ring-inset ring-slate-500/15 dark:bg-slate-500/10 dark:text-slate-400 dark:ring-slate-500/20",
    disposed:
        "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/30",
    retired:
        "bg-slate-100 text-slate-500 ring-1 ring-inset ring-slate-500/15 dark:bg-slate-700/40 dark:text-slate-400 dark:ring-slate-600/30",
};

const STATUS_LABELS = {
    active: "Active",
    under_maintenance: "Maintenance",
    inactive: "Inactive",
    disposed: "Disposed",
    retired: "Retired",
};

function StatusBadge({ status }) {
    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                STATUS_STYLES[status] ?? STATUS_STYLES.inactive
            }`}
        >
            {STATUS_LABELS[status] ?? status}
        </span>
    );
}

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

export default function Vehicles({ vehicles, office, filters }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        const value = e.target.value;

        setQuery(value);

        router.get(
            "/vehicles",
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
        <AppLayout>
            <div className="p-4 sm:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div className="flex items-start ">
                        <PageHeader
                            title="Manage Vehicles"
                            description="Track fleet vehicles, assignments, and maintenance
                            status."
                        />
                    </div>
                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm shadow-blue-600/20 w-fit shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
                    >
                        <CarFront size={17} />
                        <span>New Vehicle</span>
                    </button>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="relative flex-1 max-w-xs">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
                        />
                        <input
                            value={query}
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search by plate or office..."
                            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                        />
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 ml-auto hidden sm:block">
                        Showing {vehicles.from ?? 0}–{vehicles.to ?? 0} of{" "}
                        {vehicles.total ?? 0} users
                    </p>
                </div>

                {/* Table */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-fixed divide-y divide-slate-200 dark:divide-slate-700 text-center">
                            <thead className="bg-slate-50 dark:bg-slate-900/40">
                                <tr>
                                    <th className="w-12 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"></th>
                                    <th className="w-32 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Plate No.
                                    </th>
                                    <th className="w-28 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Office
                                    </th>
                                    <th className="w-28 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Vehicle Type
                                    </th>
                                    <th className="w-36 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Model
                                    </th>
                                    <th className="w-20 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Year
                                    </th>
                                    <th className="w-20 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Capacity
                                    </th>
                                    <th className="w-24 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Fuel Type
                                    </th>
                                    <th className="w-32 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Fleet Card No.
                                    </th>
                                    <th className="w-28 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Fuel Consumption
                                    </th>
                                    <th className="w-28 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Status
                                    </th>
                                    <th className="w-24 px-4 py-3 text-center">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                                {vehicles.data.map((vehicle) => (
                                    <tr
                                        key={vehicle.id}
                                        className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors"
                                    >
                                        <td className="px-3 py-3 text-center">
                                            <div className="flex items-center justify-center">
                                                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0">
                                                    <CarFront size={15} />
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            <span className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate block">
                                                {vehicle.plate_number}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-center text-sm text-slate-600 dark:text-slate-400 truncate">
                                            {vehicle.abbreviation}
                                        </td>

                                        <td className="px-4 py-3 text-center text-sm text-slate-600 dark:text-slate-400 truncate">
                                            {vehicle.vehicle_type}
                                        </td>

                                        <td className="px-4 py-3 text-center text-sm text-slate-600 dark:text-slate-400 truncate">
                                            {vehicle.model}
                                        </td>

                                        <td className="px-4 py-3 text-center text-sm text-slate-600 dark:text-slate-400">
                                            {vehicle.year_model}
                                        </td>

                                        <td className="px-4 py-3 text-center text-sm text-slate-600 dark:text-slate-400">
                                            {vehicle.capacity}
                                        </td>

                                        <td className="px-4 py-3 text-center text-sm text-slate-600 dark:text-slate-400 truncate">
                                            {vehicle.fuel_type}
                                        </td>

                                        <td className="px-4 py-3 text-center text-sm text-slate-600 dark:text-slate-400 truncate">
                                            {vehicle.fleet_card_number}
                                        </td>

                                        <td className="px-4 py-3 text-center text-sm text-slate-600 dark:text-slate-400">
                                            {vehicle.fuel_consumption}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            <div className="flex justify-center">
                                                <StatusBadge
                                                    status={vehicle.status}
                                                />
                                            </div>
                                        </td>

                                        <td className="px-2 py-3 text-center">
                                            <div className="flex justify-center gap-1">
                                                <button
                                                    className="p-1.5 rounded-md text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                                                    aria-label={`Edit ${vehicle.id}`}
                                                >
                                                    <Pencil size={15} />
                                                </button>

                                                <button
                                                    className="p-1.5 rounded-md text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                                    aria-label={`Delete ${vehicle.id}`}
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {vehicles.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={12}
                                            className="px-5 py-12 text-center"
                                        >
                                            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                                No vehicles found
                                            </p>
                                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                                                Try a different search, or add a
                                                new vehicle.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <Pagination links={vehicles.links} />
                </div>
            </div>

            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                title="Add New Vehicle"
                subtitle="Fill in the details of the new vehicle below."
                footer={
                    <div className="flex justify-end gap-2">
                        <button
                            className="px-4 py-2 text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
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
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Vehicle info
                </p>
                <Field label="Plate No. / License Plate" htmlFor="plate_no">
                    <TextInput
                        id="plate_no"
                        name="plate_no"
                        placeholder="e.g. ABC 123"
                    />
                </Field>
                <Field label="Vehicle Type" htmlFor="vehicle_type">
                    <SelectInput
                        id="vehicle_type"
                        name="vehicle_type"
                        placeholder="Select type"
                    />
                </Field>
                <Field label="Model" htmlFor="model">
                    <TextInput
                        id="model"
                        name="model"
                        placeholder="e.g. Toyota Hiace"
                    />
                </Field>
                <Field label="Year Model" htmlFor="year_model">
                    <SelectInput
                        id="year_model"
                        name="year_model"
                        placeholder="Select year"
                    />
                </Field>

                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Capacity & usage
                </p>
                <Field label="Capacity" htmlFor="capacity">
                    <NumberInput
                        id="capacity"
                        name="capacity"
                        placeholder="No. of passengers"
                    />
                </Field>
                <Field label="Fuel Type" htmlFor="fuel_type">
                    <SelectInput
                        id="fuel_type"
                        name="fuel_type"
                        placeholder="Select fuel type"
                    />
                </Field>
                <Field label="Fleet Card No." htmlFor="fleet_card">
                    <TextInput
                        id="fleet_card"
                        name="fleet_card"
                        placeholder="e.g. 123456"
                    />
                </Field>
                <Field
                    label="Fuel Consumption (km/L)"
                    htmlFor="fuel_consumption"
                >
                    <NumberInput
                        id="fuel_consumption"
                        name="fuel_consumption"
                        placeholder="e.g. 12"
                    />
                </Field>
                <Field label="Assigned Office" htmlFor="assigned_office">
                    <SelectInput
                        id="assigned_office"
                        name="assigned_office"
                        placeholder="Select office"
                    />
                </Field>

                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Status & maintenance
                </p>
                <Field label="Vehicle Status" htmlFor="vehicle_status">
                    <SelectInput
                        id="vehicle_status"
                        name="vehicle_status"
                        placeholder="Select status"
                    />
                </Field>
            </Drawer>
        </AppLayout>
    );
}
