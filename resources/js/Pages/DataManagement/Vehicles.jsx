import AppLayout from "../../Layouts/AppLayout";
import Drawer from "../../components/ui/Drawer";
import { useMemo, useState } from "react";
import { Trash2, Pencil, CarFront, Search, MoreHorizontal } from "lucide-react";
import {
    TextInput,
    SelectInput,
    NumberInput,
} from "../../components/ui/Inputs";

// TODO: replace with real data from the backend (Inertia props / fetch)
const MOCK_VEHICLES = [
    {
        id: 1,
        plate: "ABC 123",
        office: "Main Office",
        licenseExpiry: "2025-12-31",
        status: "Active",
    },
    {
        id: 2,
        plate: "XYZ 789",
        office: "North Branch",
        licenseExpiry: "2026-03-15",
        status: "Active",
    },
    {
        id: 3,
        plate: "DEF 456",
        office: "Main Office",
        licenseExpiry: "2025-09-01",
        status: "Maintenance",
    },
];

const STATUS_STYLES = {
    Active: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
    Maintenance:
        "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
    Inactive: "bg-slate-100 text-slate-500 ring-1 ring-inset ring-slate-500/15",
};

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

export default function Vehicles() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return MOCK_VEHICLES;
        return MOCK_VEHICLES.filter((v) =>
            [v.plate, v.office].some((val) => val.toLowerCase().includes(q)),
        );
    }, [query]);

    return (
        <AppLayout>
            <div className="p-4 sm:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                            Vehicles
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Track fleet vehicles, assignments, and maintenance
                            status.
                        </p>
                    </div>
                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm shadow-blue-600/20 w-fit shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2"
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
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            type="text"
                            placeholder="Search by plate or office..."
                            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                        />
                    </div>
                    <p className="text-xs text-slate-400 ml-auto hidden sm:block">
                        {filtered.length} of {MOCK_VEHICLES.length} vehicles
                    </p>
                </div>

                {/* Table */}
                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                                        Plate No.
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
                                {filtered.map((vehicle) => (
                                    <tr
                                        key={vehicle.id}
                                        className="hover:bg-slate-50/80 transition-colors"
                                    >
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                                                    <CarFront size={15} />
                                                </div>
                                                <span className="text-sm font-medium text-slate-800 whitespace-nowrap">
                                                    {vehicle.plate}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-sm text-slate-600 whitespace-nowrap">
                                            {vehicle.office}
                                        </td>
                                        <td className="px-5 py-3.5 text-sm text-slate-600 whitespace-nowrap">
                                            {vehicle.licenseExpiry}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <StatusBadge
                                                status={vehicle.status}
                                            />
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex justify-end gap-1.5">
                                                <button
                                                    className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                    aria-label={`Edit ${vehicle.plate}`}
                                                >
                                                    <Pencil size={15} />
                                                </button>
                                                <button
                                                    className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                    aria-label={`Delete ${vehicle.plate}`}
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                                <button
                                                    className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                                                    aria-label={`More actions for ${vehicle.plate}`}
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
                                                No vehicles found
                                            </p>
                                            <p className="text-xs text-slate-400 mt-1">
                                                Try a different search, or add a
                                                new vehicle.
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
                title="Add New Vehicle"
                subtitle="Fill in the details of the new vehicle below."
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

                <p className="text-sm font-semibold text-slate-800 mb-4">
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

                <p className="text-sm font-semibold text-slate-800 mb-4">
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
