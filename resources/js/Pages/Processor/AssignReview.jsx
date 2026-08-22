import AppLayout from "../../Layouts/AppLayout"; // Go up one level, then into Layouts
import { PageHeader } from "../../components/ui/PageHeader";
import { useState } from "react";
import { Trash2, Pencil, Search, MoreHorizontal, Plus } from "lucide-react";

export default function AssignReview() {
    const [open, setOpen] = useState(false);

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
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
                            />
                            <input
                                type="text"
                                placeholder="Search by name or office..."
                                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                            />
                        </div>

                        {/* <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 dark:bg-blue-500 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 dark:hover:bg-blue-600 active:bg-blue-800 dark:active:bg-blue-700 transition-colors"
                        >
                            <Plus size={16} />
                            Create New Trip Ticket
                        </button> */}
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
                                            Departure/Return Date
                                        </th>

                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            Requester
                                        </th>
                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            Passengers
                                        </th>

                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            Destination
                                        </th>
                                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            Purpose
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
                                            Field 3
                                        </td>
                                        <td className="px-5 py-3.5"></td>
                                        <td className="px-5 py-3.5"></td>
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
            </div>
        </AppLayout>
    );
}
