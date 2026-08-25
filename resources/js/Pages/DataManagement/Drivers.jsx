import AppLayout from "../../Layouts/AppLayout";
import Drawer from "../../components/ui/Drawer";
import { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import toast from "react-hot-toast";
import {
    UserRoundKey,
    Trash2,
    Pencil,
    Search,
    MoreHorizontal,
} from "lucide-react";
import { TextInput, SelectInput } from "../../components/ui/Inputs";

const STATUS_STYLES = {
    Active: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30",
    Expired:
        "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/30",
    Inactive:
        "bg-slate-100 text-slate-500 ring-1 ring-inset ring-slate-500/15 dark:bg-slate-500/10 dark:text-slate-400 dark:ring-slate-500/20",
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
                className="block text-[13px] font-medium tracking-wide text-slate-600 dark:text-slate-300 mb-1.5"
            >
                {label}
            </label>
            {children}
        </div>
    );
}

export default function Drivers({ drivers, filters }) {
    const [open, setOpen] = useState(false);
    const [driverToEdit, setDriverToEdit] = useState(null);
    const [query, setQuery] = useState(filters?.search ?? "");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const isEditing = Boolean(driverToEdit?.license_number);

    const {
        data,
        post,
        setData,
        processing,
        errors,
        setError,
        put,
        clearErrors,
        reset,
    } = useForm({
        user_id: "",
        license_number: "",
        license_expiry: "",
    });

    const driverData = drivers?.data ?? [];

    const validate = () => {
        clearErrors();
        const newErrors = {};

        if (!String(data.user_id).trim())
            newErrors.user_id = "User ID is missing.";
        if (!data.license_number.trim())
            newErrors.license_number = "License number is required.";
        if (!data.license_expiry.trim())
            newErrors.license_expiry = "License expiry is required.";

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return false;
        }

        return true;
    };

    const handleSearch = (e) => {
        const value = e.target.value;

        setQuery(value);

        router.get(
            "/drivers",
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

    const openLicenseDrawer = (driver) => {
        setDriverToEdit(driver);

        setData({
            user_id: driver.user_id,
            license_number: driver.license_number ?? "",
            license_expiry: driver.license_expiry ?? "",
        });

        clearErrors();
        setOpen(true);
    };

    const closeDrawer = () => {
        setOpen(false);
        setDriverToEdit(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            toast.error("Please fill up the highlighted fields.");
            return;
        }

        if (isEditing) {
            // Has license -> use drivers.id
            put(`/drivers/${driverToEdit.id}/license`, {
                preserveScroll: true,
                onSuccess: closeDrawer,
            });
        } else {
            // No license -> use users.id
            post(`/users/${driverToEdit.user_id}/license`, {
                preserveScroll: true,
                onSuccess: closeDrawer,
            });
        }
    };

    return (
        <AppLayout>
            <div className="p-4 sm:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                            Drivers
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Manage drivers, their office assignment, and license
                            status.
                        </p>
                    </div>
                    {/* <button
                        onClick={() => setOpen(true)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm shadow-blue-600/20 w-fit shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
                    >
                        <UserRoundKey size={17} />
                        <span>New Driver</span>
                    </button> */}
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
                            placeholder="Search by name or office..."
                            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                        />
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 ml-auto hidden sm:block">
                        Showing {drivers?.from ?? 0}–{drivers?.to ?? 0} of{" "}
                        {drivers?.total ?? 0} drivers
                    </p>
                </div>

                {/* Table */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-fixed divide-y divide-slate-200 dark:divide-slate-700 text-center">
                            <thead className="bg-slate-50 dark:bg-slate-900/40">
                                <tr>
                                    <th className="w-1/4 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                        Name
                                    </th>
                                    <th className="w-1/5 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                        Office Assignment
                                    </th>
                                    <th className="w-1/5 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                        License No.
                                    </th>
                                    <th className="w-1/5 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                        License Expiry
                                    </th>
                                    <th className="w-30 px-5 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                                {driverData.map((driver) => (
                                    <tr
                                        key={driver.id}
                                        className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors"
                                    >
                                        <td className="px-5 py-3.5">
                                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate text-center">
                                                {driver.first_name}{" "}
                                                {driver.middle_name
                                                    ? `${driver.middle_name} `
                                                    : ""}
                                                {driver.last_name}
                                            </p>
                                        </td>
                                        <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap text-center">
                                            {driver.abbreviation}
                                        </td>
                                        <td className="px-5 py-3.5 text-center">
                                            <StatusBadge
                                                status={driver.license_number}
                                            />
                                        </td>
                                        <td className="px-5 py-3.5 text-center">
                                            <StatusBadge
                                                status={driver.license_expiry}
                                            />
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex justify-center gap-1.5">
                                                <button
                                                    onClick={() =>
                                                        openLicenseDrawer(
                                                            driver,
                                                        )
                                                    }
                                                    className="p-1.5 rounded-md text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                                                    aria-label={
                                                        driver.user_id
                                                            ? `Edit license for ID ${driver.user_id}`
                                                            : `Add license for ID ${driver.user_id}`
                                                    }
                                                >
                                                    {driver.user_id ? (
                                                        <Pencil size={15} />
                                                    ) : (
                                                        <UserRoundKey
                                                            size={15}
                                                        />
                                                    )}
                                                </button>
                                                <button
                                                    className="p-1.5 rounded-md text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                                    aria-label={`Delete ${driver.first_name}`}
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                                <button
                                                    className="p-1.5 rounded-md text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
                                                    aria-label={`More actions for ${driver.first_name}`}
                                                >
                                                    <MoreHorizontal size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {driverData.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-5 py-12 text-center"
                                        >
                                            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                                No drivers found
                                            </p>
                                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
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
                onClose={closeDrawer}
                title={isEditing ? "Edit Driver License" : "Add Driver License"}
                subtitle={
                    isEditing
                        ? `Update license details for ${driverToEdit?.first_name ?? ""}.`
                        : `Add license details for ${driverToEdit?.first_name ?? ""}.`
                }
                footer={
                    <div className="flex justify-end gap-2">
                        <button
                            className="px-4 py-2 text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                            onClick={closeDrawer}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={processing}
                            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20 disabled:opacity-50"
                        >
                            {isEditing ? "Update" : "Save"}
                        </button>
                    </div>
                }
            >
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Details
                </p>

                <Field label="License Number" htmlFor="license_number">
                    <TextInput
                        id="license_number"
                        name="license_number"
                        value={data.license_number}
                        onChange={(e) =>
                            setData("license_number", e.target.value)
                        }
                        placeholder="License number"
                    />
                    {errors.license_number && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.license_number}
                        </p>
                    )}
                </Field>

                <Field label="License Expiry Date" htmlFor="license_expiry">
                    <TextInput
                        id="license_expiry"
                        name="license_expiry"
                        type="date"
                        value={data.license_expiry}
                        onChange={(e) =>
                            setData("license_expiry", e.target.value)
                        }
                    />
                    {errors.license_expiry && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.license_expiry}
                        </p>
                    )}
                </Field>
            </Drawer>
        </AppLayout>
    );
}
