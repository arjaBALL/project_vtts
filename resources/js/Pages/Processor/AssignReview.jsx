import AppLayout from "../../Layouts/AppLayout"; // Go up one level, then into Layouts
import { PageHeader } from "../../components/ui/PageHeader";
import Drawer from "../../components/ui/Drawer";
import { useState } from "react";
import { Trash2, Pencil, Search, ThumbsUp, ThumbsDown } from "lucide-react";
import toast from "react-hot-toast";
import Pagination from "../../components/ui/Pagination";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { useForm, router } from "@inertiajs/react";
import {
    TextInput,
    SelectInput,
    NumberInput,
} from "../../components/ui/Inputs";

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

export default function AssignReview({
    triptickets,
    drivers,
    vehicles,
    filters,
}) {
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

    const validate = () => {
        clearErrors();
        const newErrors = {};

        if (!data.driver_id.trim())
            newErrors.driver_id = "Departure date is required.";
        if (!data.vehicle_id.trim())
            newErrors.vehicle_id = "Departure date is required.";

        if (Object.keys(newErrors).length > 0) {
            Object.entries(newErrors).forEach(([field, message]) =>
                setError(field, message),
            );
            return false;
        }
        return true;
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        router.get(
            "/assign-review",
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            toast.error("Please fill up the highlighted fields.");
            return;
        }

        patch(`/assign-review/${ticketToEdit.id}`, {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast.success("Driver details updated successfully.");
            },

            onError: () => {
                toast.error("Something went wrong. Please check the form.");
            },
        });
    };

    return (
        <AppLayout>
            <div className="min-h-full">
                <div className="p-6">
                    <div className="flex items-start ">
                        <PageHeader
                            title="Review Trip Ticket"
                            description="Review, validate, and assign the trip ticket request."
                        />
                    </div>

                    <div className="flex items-center justify-between gap-4 flex-wrap my-4">
                        <div className="relative flex-1 max-w-xs">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />
                            <input
                                type="text"
                                placeholder="Search by name or office..."
                                value={query}
                                onChange={handleSearch}
                                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                            />
                        </div>

                        {/* <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 active:bg-blue-800 transition-colors"
                        >
                            <Plus size={16} />
                            Create New Trip Ticket
                        </button> */}
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden mt-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 text-center">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap text-center">
                                            Travel Dates
                                        </th>
                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap text-center">
                                            Requestor
                                        </th>
                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap text-center">
                                            Destination
                                        </th>
                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap text-center">
                                            Passengers
                                        </th>
                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap text-center">
                                            Purpose
                                        </th>
                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap text-center">
                                            Status
                                        </th>
                                        <th className="px-5 py-3 text-center">
                                            <span className="sr-only">
                                                Actions
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {triptickets?.data?.length > 0 ? (
                                        triptickets.data.map((ticket) => (
                                            <tr
                                                key={ticket.id}
                                                className="hover:bg-slate-50/80 transition-colors"
                                            >
                                                <td className="px-5 py-3.5 text-sm text-slate-600 whitespace-nowrap text-center">
                                                    <div className="text-xs text-slate-400">
                                                        {ticket.departure_date}{" "}
                                                        - {ticket.return_date}
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3.5 text-sm text-slate-600 whitespace-nowrap text-center">
                                                    Employee Name
                                                </td>
                                                {/* Destination */}
                                                <td className="px-5 py-3.5 text-sm text-slate-600 whitespace-nowrap text-center">
                                                    {ticket.destination}
                                                </td>
                                                {/* Passengers */}
                                                <td className="px-5 py-3.5 text-sm text-slate-600 whitespace-nowrap text-center">
                                                    {ticket.passengers}
                                                </td>
                                                {/* Purpose */}
                                                <td className="px-5 py-3.5 text-sm text-slate-600 text-center">
                                                    {ticket.purpose}
                                                </td>
                                                {/* Status */}
                                                <td className="px-5 py-3.5 text-center">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                                            ticket.status ===
                                                            "approved"
                                                                ? "bg-green-100 text-green-700"
                                                                : ticket.status ===
                                                                    "rejected"
                                                                  ? "bg-red-100 text-red-700"
                                                                  : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                    >
                                                        {ticket.status
                                                            ? ticket.status
                                                                  .charAt(0)
                                                                  .toUpperCase() +
                                                              ticket.status.slice(
                                                                  1,
                                                              )
                                                            : "Pending"}
                                                    </span>
                                                </td>
                                                {/* Actions */}
                                                <td className="px-5 py-3.5">
                                                    <div className="flex justify-center gap-1.5">
                                                        {/* Approve */}
                                                        <button
                                                            type="button"
                                                            aria-label="Approve"
                                                            title="Approve"
                                                            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md border border-green-200 text-green-600 hover:text-green-700 hover:border-green-300 hover:bg-green-50 transition-colors"
                                                            onClick={() => {
                                                                setTicketToEdit(
                                                                    ticket,
                                                                );

                                                                setData({
                                                                    trip_ticket_id:
                                                                        ticket.id,
                                                                    driver_id:
                                                                        "",
                                                                    vehicle_id:
                                                                        "",
                                                                });

                                                                setOpen(true);
                                                            }}
                                                        >
                                                            <ThumbsUp
                                                                size={13}
                                                            />
                                                            Approve
                                                        </button>

                                                        {/* Reject */}
                                                        <button
                                                            type="button"
                                                            aria-label="Reject"
                                                            title="Reject"
                                                            onClick={() =>
                                                                handleReject(
                                                                    ticket,
                                                                )
                                                            }
                                                            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md border border-red-200 text-red-600 hover:text-red-700 hover:border-red-300 hover:bg-red-50 transition-colors"
                                                        >
                                                            <ThumbsDown
                                                                size={13}
                                                            />
                                                            Reject
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-5 py-12 text-center"
                                            >
                                                <p className="text-sm font-medium text-slate-600">
                                                    No results found
                                                </p>
                                                <p className="text-xs text-slate-400 mt-1">
                                                    Try a different search, or
                                                    add a new item.
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                title={ticketToEdit ? "Edit Ticket" : "Add New Ticket"}
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
                            onClick={handleSubmit}
                            disabled={processing}
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
                <p className="text-sm font-semibold text-slate-800 mb-4">
                    Ticket info
                </p>

                <Field label="Driver" htmlFor="driver">
                    <SelectInput
                        id="driver_id"
                        name="driver_id"
                        placeholder="Select type"
                        value={data.driver_id}
                        onChange={(e) => setData("driver_id", e.target.value)}
                    >
                        <option value="">Select driver</option>

                        {drivers.map((driver) => (
                            <option key={driver.id} value={driver.id}>
                                {[
                                    driver.first_name,
                                    driver.middle_name,
                                    driver.last_name,
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            </option>
                        ))}
                    </SelectInput>
                    {errors.driver_id && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.driver_id}
                        </p>
                    )}
                </Field>

                <Field label="Vehicle" htmlFor="vehicle_id">
                    <SelectInput
                        id="vehicle_id"
                        name="vehicle_id"
                        value={data.vehicle_id}
                        onChange={(e) => setData("vehicle_id", e.target.value)}
                    >
                        <option value="">Select vehicle</option>

                        {vehicles.map((vehicle) => (
                            <option key={vehicle.id} value={vehicle.id}>
                                Plate No. {vehicle.plate_number} -{" "}
                                {vehicle.model} - Capacity: {vehicle.capacity}
                            </option>
                        ))}
                    </SelectInput>

                    {errors.vehicle_id && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.vehicle_id}
                        </p>
                    )}
                </Field>
            </Drawer>
        </AppLayout>
    );
}
