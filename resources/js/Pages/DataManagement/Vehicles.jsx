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

export default function Vehicles({
    vehicles,
    offices,
    vehicle_types,
    filters,
}) {
    const [open, setOpen] = useState(false);
    const [vehicleToEdit, setVehicleToEdit] = useState(null);
    const [query, setQuery] = useState(filters?.search ?? "");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [vehicleToDelete, setVehicleToDelete] = useState(null);

    const {
        data,
        post,
        setData,
        processing,
        errors,
        setError,
        clearErrors,
        reset,
    } = useForm({
        plate_number: "",
        office_id: "",
        vehicle_type_id: "",
        model: "",
        year_model: "",
        capacity: "",
        status: "active",
        fuel_type: "",
        fleet_card_number: "",
        fuel_consumption: "",
    });

    const validate = () => {
        clearErrors();
        const newErrors = {};

        if (!data.plate_number.trim())
            newErrors.plate_number = "Plate number is required.";
        if (!data.office_id.trim()) newErrors.office_id = "Office is required.";
        if (!data.vehicle_type_id.trim())
            newErrors.vehicle_type_id = "Vehicle type is required.";
        if (!data.model.trim()) newErrors.model = "Model is required.";
        if (!data.year_model.trim())
            newErrors.year_model = "Year model is required.";
        if (!data.capacity.trim()) newErrors.capacity = "Capacity is required.";
        if (!data.status.trim()) newErrors.status = "Status is required.";
        if (!data.fuel_type.trim())
            newErrors.fuel_type = "Fuel type is required.";
        if (!data.fuel_consumption.trim())
            newErrors.fuel_consumption = "Fuel consumption is required.";

        if (Object.keys(newErrors).length > 0) {
            Object.entries(newErrors).forEach(([field, message]) =>
                setError(field, message),
            );
            return false;
        }
        return true;
    };

    const handleEdit = (vehicle) => {
        setVehicleToEdit(vehicle);

        setData({
            plate_number: vehicle.plate_number ?? "",
            office_id: String(vehicle.office_id ?? ""),
            vehicle_type_id: String(vehicle.vehicle_type_id ?? ""),
            model: vehicle.model ?? "",
            year_model: String(vehicle.year_model ?? ""),
            capacity: String(vehicle.capacity ?? ""),
            fuel_type: vehicle.fuel_type ?? "",
            fleet_card_number: vehicle.fleet_card_number ?? "",
            fuel_consumption: String(vehicle.fuel_consumption ?? ""),
            status: vehicle.status ?? "active",
        });

        clearErrors();
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            toast.error("Please fill up the highlighted fields.");
            return;
        }

        if (vehicleToEdit) {
            router.put(`/vehicles/${vehicleToEdit.id}`, data, {
                onSuccess: () => {
                    reset();
                    setVehicleToEdit(null);
                    setOpen(false);
                    toast.success("Vehicle updated successfully.");
                },

                onError: () => {
                    toast.error("Something went wrong. Please check the form.");
                },
            });
        } else {
            post("/vehicles", {
                onSuccess: () => {
                    reset();
                    setOpen(false);
                    toast.success("Vehicle created successfully.");
                },

                onError: () => {
                    toast.error("Something went wrong. Please check the form.");
                },
            });
        }
    };

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

    const handleDelete = (vehicle) => {
        setVehicleToDelete(vehicle);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (!vehicleToDelete) return;

        router.delete(`/vehicles/${vehicleToDelete.id}`, {
            preserveScroll: true,

            onSuccess: () => {
                toast.success("Vehicle deleted successfully.");
                setDeleteDialogOpen(false);
                setVehicleToDelete(null);
            },

            onError: () => {
                toast.error("Failed to delete vehicle. Please try again.");
            },
        });
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
                        {vehicles.total ?? 0} vehicles
                    </p>
                </div>

                {/* Table */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-fixed divide-y divide-slate-200 dark:divide-slate-700 text-center">
                            <thead className="bg-slate-50 dark:bg-slate-900/40">
                                <tr>
                                    <th className="w-8 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"></th>
                                    <th className="w-20 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
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
                                    <th className="w-16 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
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
                                                    onClick={() =>
                                                        handleEdit(vehicle)
                                                    }
                                                    className="p-1.5 rounded-md text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                                                    aria-label={`Edit ${vehicle.id}`}
                                                >
                                                    <Pencil size={15} />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(vehicle)
                                                    }
                                                    className="p-1.5 rounded-md text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                                    aria-label={`Delete ${vehicle.plate_number} ${vehicle.model}`}
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
                title={vehicleToEdit ? "Edit Vehicle" : "Add New Vehicle"}
                subtitle={
                    vehicleToEdit
                        ? "Update the vehicle's information below."
                        : "Fill in the details of the new vehicle below."
                }
                footer={
                    <div className="flex justify-end gap-2">
                        <button
                            className="px-4 py-2 text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={processing}
                            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20 disabled:opacity-50"
                        >
                            {processing
                                ? "Saving..."
                                : vehicleToEdit
                                  ? "Update"
                                  : "Save"}
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
                        value={data.plate_number}
                        onChange={(e) =>
                            setData("plate_number", e.target.value)
                        }
                    />

                    {errors.plate_number && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.plate_number}
                        </p>
                    )}
                </Field>
                <Field label="Vehicle Type" htmlFor="vehicle_type">
                    <SelectInput
                        id="vehicle_type_id"
                        name="vehicle_type_id"
                        placeholder="Select type"
                        value={data.vehicle_type_id}
                        onChange={(e) =>
                            setData("vehicle_type_id", e.target.value)
                        }
                    >
                        <option value="">Select type</option>

                        {vehicle_types.map((vehicle_type) => (
                            <option
                                key={vehicle_type.id}
                                value={vehicle_type.id}
                            >
                                {vehicle_type.name}
                            </option>
                        ))}
                    </SelectInput>
                    {errors.vehicle_type_id && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.vehicle_type_id}
                        </p>
                    )}
                </Field>
                <Field label="Model" htmlFor="model">
                    <TextInput
                        id="model"
                        name="model"
                        placeholder="e.g. Toyota Hiace"
                        value={data.model}
                        onChange={(e) => setData("model", e.target.value)}
                    />
                    {errors.model && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.model}
                        </p>
                    )}
                </Field>
                <Field label="Year Model" htmlFor="year_model">
                    <TextInput
                        id="year_model"
                        name="year_model"
                        placeholder="Select year"
                        value={data.year_model}
                        onChange={(e) => setData("year_model", e.target.value)}
                    />
                    {errors.year_model && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.year_model}
                        </p>
                    )}
                </Field>

                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Capacity & usage
                </p>
                <Field label="Capacity" htmlFor="capacity">
                    <NumberInput
                        id="capacity"
                        name="capacity"
                        placeholder="No. of passengers"
                        value={data.capacity}
                        onChange={(e) => setData("capacity", e.target.value)}
                    />
                    {errors.capacity && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.capacity}
                        </p>
                    )}
                </Field>
                <Field label="Fuel Type" htmlFor="fuel_type">
                    <SelectInput
                        id="fuel_type"
                        name="fuel_type"
                        placeholder="Select fuel type"
                        value={data.fuel_type}
                        onChange={(e) => setData("fuel_type", e.target.value)}
                    >
                        <option value="">Select fuel type</option>
                        <option value="gasoline">Gasoline</option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">Electric</option>
                        <option value="hybrid">Hybrid</option>
                    </SelectInput>
                    {errors.fuel_type && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.fuel_type}
                        </p>
                    )}
                </Field>
                <Field label="Fleet Card No." htmlFor="fleet_card_number">
                    <TextInput
                        id="fleet_card_number"
                        name="fleet_card_number"
                        placeholder="e.g. 123456"
                        value={data.fleet_card_number}
                        onChange={(e) =>
                            setData("fleet_card_number", e.target.value)
                        }
                    />
                    {errors.fleet_card_number && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.fleet_card_number}
                        </p>
                    )}
                </Field>
                <Field
                    label="Fuel Consumption (km/L)"
                    htmlFor="fuel_consumption"
                >
                    <NumberInput
                        id="fuel_consumption"
                        name="fuel_consumption"
                        placeholder="e.g. 12"
                        value={data.fuel_consumption}
                        onChange={(e) =>
                            setData("fuel_consumption", e.target.value)
                        }
                    />
                    {errors.fuel_consumption && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.fuel_consumption}
                        </p>
                    )}
                </Field>
                <Field label="Office" htmlFor="office">
                    <SelectInput
                        id="office_id"
                        name="office_id"
                        placeholder="Select office"
                        value={data.office_id}
                        onChange={(e) => setData("office_id", e.target.value)}
                    >
                        <option value="">Select office</option>

                        {offices.map((office) => (
                            <option key={office.id} value={office.id}>
                                {office.office} ({office.abbreviation})
                            </option>
                        ))}
                    </SelectInput>

                    {errors.office_id && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.office_id}
                        </p>
                    )}
                </Field>

                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Status & maintenance
                </p>
                <Field label="Vehicle Status" htmlFor="status">
                    <SelectInput
                        id="status"
                        name="status"
                        placeholder="Select status"
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                    >
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="under_maintenance">
                            Under maintenance
                        </option>
                        <option value="inactive">Inactive</option>
                        <option value="disposed">Disposed</option>
                        <option value="retired">Retired</option>
                    </SelectInput>
                    {errors.status && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.status}
                        </p>
                    )}
                </Field>
            </Drawer>

            <ConfirmDialog
                open={deleteDialogOpen}
                onOpenChange={(open) => {
                    setDeleteDialogOpen(open);

                    if (!open) {
                        setVehicleToDelete(null);
                    }
                }}
                title="Delete vehicle?"
                description={
                    vehicleToDelete
                        ? `Delete ${vehicleToDelete.plate_number} ${vehicleToDelete.model}? This can be undone by an admin.`
                        : ""
                }
                confirmText="Delete"
                cancelText="Cancel"
                destructive
                onConfirm={confirmDelete}
            />
        </AppLayout>
    );
}
