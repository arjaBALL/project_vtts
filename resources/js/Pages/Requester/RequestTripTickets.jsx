import { useState } from "react";
import AppLayout from "../../Layouts/AppLayout"; // Go up one level, then into Layouts
import Drawer from "../../components/ui/Drawer";
import { PageHeader } from "../../components/ui/PageHeader";
import { Trash2, Pencil, Search, MoreHorizontal, Plus } from "lucide-react";
import {
    TextInput,
    SelectInput,
    DateInput,
    TextArea,
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

export default function RequestTripTicket() {
    const [open, setOpen] = useState(false);

    return (
        <AppLayout>
            <div className="min-h-full">
                <div className="p-6">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <PageHeader
                            title="Request Trip Ticket"
                            description="Create and submit a new trip ticket request."
                        />
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
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
                                            Purpose
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
                                    <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 text-xs font-semibold flex items-center justify-center shrink-0">
                                                    AB
                                                </div>
                                                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                                    Name
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                            Field 2
                                        </td>
                                        <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                            Field 3
                                        </td>
                                        <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                            Field 3
                                        </td>
                                        <td className="px-5 py-3.5"></td>
                                        <td className="px-5 py-3.5"></td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex justify-end gap-1.5">
                                                <button
                                                    className="p-1.5 rounded-md text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                                                    aria-label="Edit"
                                                >
                                                    <Pencil size={15} />
                                                </button>
                                                <button
                                                    className="p-1.5 rounded-md text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                                    aria-label="Delete"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                                <button
                                                    className="p-1.5 rounded-md text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
                                                    aria-label="More actions"
                                                >
                                                    <MoreHorizontal size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Empty state — show conditionally when there's no data
                <tr>
                    <td colSpan={7} className="px-5 py-12 text-center">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            No results found
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                            Try a different search, or add a new item.
                        </p>
                    </td>
                </tr>
                */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <Drawer
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Create New Trip Ticket"
                    subtitle="Enter the required trip, vehicle, and passenger details below."
                    footer={
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                className="px-4 py-2 text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm shadow-blue-600/20 dark:shadow-blue-500/20"
                                onClick={() => setOpen(false)}
                            >
                                Save
                            </button>
                        </div>
                    }
                >
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4">
                        Details
                    </p>

                    <form className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {/* Departure Date */}
                        <Field label="Departure Date" htmlFor="departure_date">
                            <TextInput
                                id="departure_date"
                                name="departure_date"
                                type="date"
                            />
                        </Field>

                        {/* Return Date */}
                        <Field label="Return Date" htmlFor="return_date">
                            <TextInput
                                id="return_date"
                                name="return_date"
                                type="date"
                            />
                        </Field>

                        {/* Destination - Full Row */}
                        <div className="md:col-span-2">
                            <Field label="Destination" htmlFor="destination">
                                <TextInput
                                    id="destination"
                                    name="destination"
                                    placeholder="Enter destination"
                                />
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
                                    className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900/60 px-3 py-2 text-sm text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors duration-150 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20"
                                />
                            </Field>
                        </div>
                    </form>
                </Drawer>
            </div>
        </AppLayout>
    );
}
