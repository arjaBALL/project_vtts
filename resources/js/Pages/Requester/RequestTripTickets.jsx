import { useState } from "react";
import AppLayout from "../../Layouts/AppLayout";
import Drawer from "../../components/ui/Drawer";
import { useForm, router } from "@inertiajs/react";
import { PageHeader } from "../../components/ui/PageHeader";
import toast from "react-hot-toast";
import { Trash2, Pencil, Search, MoreHorizontal, Plus } from "lucide-react";
import {
    TextInput,
    SelectInput,
    DateInput,
    NumberInput,
    TextArea,
} from "../../components/ui/Inputs";

function Field({ label, htmlFor, children }) {
    return (
        <div className="mb-3">
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

export default function RequestTripTicket({ triptickets, filters }) {
    const [open, setOpen] = useState(false);
    const [tickettoEdit, setTicketToEdit] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [ticketToDelete, setTicketToDelete] = useState(null);
    const [query, setQuery] = useState(filters?.search ?? "");

    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${String(
        today.getMonth() + 1,
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const {
        data,
        post,
        put, // Add put for updates
        setData,
        processing,
        errors,
        setError,
        clearErrors,
        reset,
    } = useForm({
        user_id: "",
        trip_ticket_no: "",
        departure_date: formattedToday,
        return_date: formattedToday,
        destination: "",
        passengers: "1",
        purpose: "",
        status: "pending",
    });

    const validate = () => {
        clearErrors();
        const newErrors = {};

        if (!data.departure_date.trim())
            newErrors.departure_date = "Departure date is required.";
        if (!data.return_date.trim())
            newErrors.return_date = "Return date is required.";
        if (!data.destination.trim())
            newErrors.destination = "Destination is required.";
        if (!data.passengers.trim())
            newErrors.passengers = "Passengers is required.";
        if (!data.purpose.trim()) newErrors.purpose = "Purpose is required.";

        // Validate return date is after departure date
        if (data.return_date && data.departure_date) {
            if (new Date(data.return_date) < new Date(data.departure_date)) {
                newErrors.return_date =
                    "Return date must be after departure date.";
            }
        }

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
            "/triptickets",
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
            toast.error("Please fill up highlighted fields");
            return;
        }

        if (tickettoEdit) {
            // Use PUT for updates
            put(`/triptickets/${tickettoEdit.id}`, {
                onSuccess: () => {
                    reset();
                    setTicketToEdit(null);
                    setOpen(false);
                    toast.success("Trip ticket updated successfully.");
                },
                onError: (errors) => {
                    if (errors && typeof errors === "object") {
                        Object.entries(errors).forEach(([field, message]) => {
                            setError(field, message);
                        });
                        toast.error("Please check the highlighted fields.");
                    } else {
                        toast.error(
                            "Something went wrong. Please check the form.",
                        );
                    }
                },
            });
        } else {
            post("/triptickets", {
                onSuccess: () => {
                    reset();
                    setOpen(false);
                    toast.success("Trip ticket created successfully.");
                },
                onError: (errors) => {
                    if (errors && typeof errors === "object") {
                        Object.entries(errors).forEach(([field, message]) => {
                            setError(field, message);
                        });
                        toast.error("Please check the highlighted fields.");
                    } else {
                        toast.error(
                            "Something went wrong. Please check the form.",
                        );
                    }
                },
            });
        }
    };

    // FIXED: Delete handler - pass the actual ticket, not the whole list
    const handleDelete = (ticket) => {
        setTicketToDelete(ticket);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (!ticketToDelete) return;

        router.delete(`/triptickets/${ticketToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Trip ticket deleted successfully.");
                setDeleteDialogOpen(false);
                setTicketToDelete(null);
            },
            onError: () => {
                toast.error("Failed to delete ticket. Please try again.");
            },
        });
    };

    return (
        <AppLayout>
            <div className="min-h-full">
                <div className="p-6">
                    <div className="flex items-start ">
                        <PageHeader
                            title="Request Trip Ticket"
                            description="Create and submit a new trip ticket request."
                        />
                    </div>

                    <div className="flex items-center justify-between gap-4 flex-wrap my-4">
                        <div className="relative flex-1 max-w-xs">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
                            />
                            <input
                                type="text"
                                value={query}
                                onChange={handleSearch}
                                placeholder="Search by destination or purpose..."
                                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setOpen(true);
                                clearErrors();
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 dark:bg-blue-500 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 dark:hover:bg-blue-600 active:bg-blue-800 dark:active:bg-blue-700 transition-colors"
                        >
                            <Plus size={16} />
                            Create New Trip Ticket
                        </button>
                    </div>

                    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden mt-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-left">
                                <thead className="bg-slate-50 dark:bg-slate-900/40">
                                    <tr>
                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            Trip Ticket No.
                                        </th>
                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            Departure Date
                                        </th>
                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            Return Date
                                        </th>
                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            Destination
                                        </th>
                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            Passengers
                                        </th>
                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            Purpose
                                        </th>
                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            Status
                                        </th>
                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            Driver
                                        </th>
                                        <th className="px-5 py-3">
                                            <span className="sr-only">
                                                Actions
                                            </span>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                                    {triptickets?.data?.length > 0 ? (
                                        triptickets.data.map((ticket) => (
                                            <tr
                                                key={ticket.id}
                                                className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors"
                                            >
                                                {/* Trip Ticket Number */}
                                                <td className="px-5 py-3.5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 text-xs font-semibold flex items-center justify-center shrink-0">
                                                            {ticket.trip_ticket_no
                                                                ?.slice(0, 2)
                                                                .toUpperCase() ??
                                                                "TT"}
                                                        </div>
                                                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                                            {
                                                                ticket.trip_ticket_no
                                                            }
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Departure Date */}
                                                <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                                    {ticket.departure_date}
                                                </td>

                                                {/* Return Date */}
                                                <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                                    {ticket.return_date}
                                                </td>

                                                {/* Destination */}
                                                <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                                    {ticket.destination}
                                                </td>

                                                {/* Passengers */}
                                                <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                                    {ticket.passengers}
                                                </td>

                                                {/* Purpose */}
                                                <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-400">
                                                    {ticket.purpose}
                                                </td>

                                                {/* Status */}
                                                <td className="px-5 py-3.5">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                                            ticket.status ===
                                                            "approved"
                                                                ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                                                                : ticket.status ===
                                                                    "rejected"
                                                                  ? "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
                                                                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400"
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

                                                {/* Driver */}
                                                <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-400">
                                                    {ticket.driver?.name ?? "—"}
                                                </td>

                                                {/* Actions */}
                                                <td className="px-5 py-3.5">
                                                    <div className="flex justify-end gap-1.5">
                                                        {/* Edit */}
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setTicketToEdit(
                                                                    ticket,
                                                                );
                                                                // FIXED: Set all form fields including hidden ones
                                                                setData({
                                                                    user_id:
                                                                        ticket.user_id ||
                                                                        "",
                                                                    trip_ticket_no:
                                                                        ticket.trip_ticket_no ||
                                                                        "",
                                                                    departure_date:
                                                                        ticket.departure_date ||
                                                                        formattedToday,
                                                                    return_date:
                                                                        ticket.return_date ||
                                                                        formattedToday,
                                                                    destination:
                                                                        ticket.destination ||
                                                                        "",
                                                                    passengers:
                                                                        String(
                                                                            ticket.passengers ||
                                                                                "1",
                                                                        ),
                                                                    purpose:
                                                                        ticket.purpose ||
                                                                        "",
                                                                    status:
                                                                        ticket.status ||
                                                                        "pending",
                                                                });
                                                                setOpen(true);
                                                            }}
                                                            className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                                                            aria-label="Edit"
                                                        >
                                                            <Pencil size={15} />
                                                        </button>

                                                        {/* Delete */}
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    ticket,
                                                                )
                                                            } // FIXED: Pass the ticket, not triptickets
                                                            className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                                            aria-label="Delete"
                                                        >
                                                            <Trash2 size={15} />
                                                        </button>

                                                        {/* More */}
                                                        <button
                                                            type="button"
                                                            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                                            aria-label="More actions"
                                                        >
                                                            <MoreHorizontal
                                                                size={15}
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={9}
                                                className="px-5 py-12 text-center"
                                            >
                                                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                                    No trip tickets found
                                                </p>
                                                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                                                    Try a different search, or
                                                    create a new trip ticket.
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {triptickets?.links && triptickets.links.length > 3 && (
                            <div className="flex items-center justify-between px-5 py-4 border-t border-slate-200 dark:border-slate-700">
                                <div className="text-sm text-slate-500 dark:text-slate-400">
                                    Showing{" "}
                                    <span className="font-medium text-slate-700 dark:text-slate-300">
                                        {triptickets.from ?? 0}
                                    </span>{" "}
                                    to{" "}
                                    <span className="font-medium text-slate-700 dark:text-slate-300">
                                        {triptickets.to ?? 0}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-medium text-slate-700 dark:text-slate-300">
                                        {triptickets.total ?? 0}
                                    </span>{" "}
                                    results
                                </div>
                                <div className="flex items-center gap-1">
                                    {triptickets.links.map((link, index) => {
                                        if (!link.url) {
                                            return (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1.5 text-sm text-slate-400 dark:text-slate-600"
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            );
                                        }
                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => {
                                                    router.get(
                                                        link.url,
                                                        {},
                                                        {
                                                            preserveState: true,
                                                            preserveScroll: true,
                                                        },
                                                    );
                                                }}
                                                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                                                    link.active
                                                        ? "bg-blue-600 text-white"
                                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                                                }`}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Delete Confirmation Dialog */}
                {deleteDialogOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full mx-4">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                Delete Trip Ticket
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                                Are you sure you want to delete trip ticket{" "}
                                <span className="font-medium">
                                    {ticketToDelete?.trip_ticket_no}
                                </span>
                                ? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDeleteDialogOpen(false);
                                        setTicketToDelete(null);
                                    }}
                                    className="px-4 py-2 text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={confirmDelete}
                                    className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm shadow-red-600/20"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <Drawer
                    open={open}
                    onClose={() => {
                        setOpen(false);
                        setTicketToEdit(null);
                        clearErrors();
                    }}
                    title={
                        tickettoEdit
                            ? "Edit Trip Ticket"
                            : "Create New Trip Ticket"
                    }
                    subtitle={
                        tickettoEdit
                            ? "Update the trip ticket details below."
                            : "Enter the required trip, vehicle, and passenger details below."
                    }
                    footer={
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                className="px-4 py-2 text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                onClick={() => {
                                    setOpen(false);
                                    setTicketToEdit(null);
                                    clearErrors();
                                }}
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
                                    : tickettoEdit
                                      ? "Update"
                                      : "Save"}
                            </button>
                        </div>
                    }
                >
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4">
                        Details
                    </p>

                    <form className="grid grid-cols-1 gap-1 md:grid-cols-2">
                        {/* Departure Date */}
                        <Field label="Departure Date" htmlFor="departure_date">
                            <TextInput
                                id="departure_date"
                                name="departure_date"
                                type="date"
                                value={data.departure_date} // FIXED: Added value prop
                                onChange={(e) =>
                                    setData("departure_date", e.target.value)
                                }
                            />
                            {errors.departure_date && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.departure_date}
                                </p>
                            )}
                        </Field>

                        {/* Return Date */}
                        <Field label="Return Date" htmlFor="return_date">
                            <TextInput
                                id="return_date"
                                name="return_date"
                                type="date"
                                value={data.return_date} // FIXED: Changed from departure_date to return_date
                                onChange={(e) =>
                                    setData("return_date", e.target.value)
                                }
                            />
                            {errors.return_date && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.return_date}
                                </p>
                            )}
                        </Field>

                        {/* Destination - Full Row */}
                        <div className="md:col-span-2">
                            <Field label="Destination" htmlFor="destination">
                                <TextInput
                                    id="destination"
                                    name="destination"
                                    placeholder="Enter destination"
                                    value={data.destination} // FIXED: Added value prop
                                    onChange={(e) =>
                                        setData("destination", e.target.value)
                                    }
                                />
                                {errors.destination && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.destination}
                                    </p>
                                )}
                            </Field>
                        </div>

                        <div className="md:col-span-2">
                            <Field label="Passengers" htmlFor="passengers">
                                <NumberInput
                                    id="passengers"
                                    name="passengers"
                                    type="number"
                                    min="1"
                                    value={data.passengers} // FIXED: Added value prop
                                    placeholder="Enter Passengers"
                                    onChange={(e) =>
                                        setData("passengers", e.target.value)
                                    }
                                />
                                {errors.passengers && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.passengers}
                                    </p>
                                )}
                            </Field>
                        </div>

                        {/* Purpose - Full Row */}
                        <div className="md:col-span-2">
                            <Field label="Purpose" htmlFor="purpose">
                                <TextArea
                                    id="purpose"
                                    name="purpose"
                                    rows={4}
                                    placeholder="Enter the purpose of the trip"
                                    value={data.purpose} // FIXED: Added value prop
                                    className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900/60 px-3 py-2 text-sm text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors duration-150 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20"
                                    onChange={(e) =>
                                        setData("purpose", e.target.value)
                                    }
                                />
                                {errors.purpose && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.purpose}
                                    </p>
                                )}
                            </Field>
                        </div>
                    </form>
                </Drawer>
            </div>
        </AppLayout>
    );
}
