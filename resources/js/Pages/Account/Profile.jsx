import AppLayout from "../../Layouts/AppLayout"; // Go up one level, then into Layouts
import {
    Trash2,
    Pencil,
    Search,
    MoreHorizontal,
    Plus,
    Mail,
    PhoneCall,
    Building,
    Lock,
    FileText,
    CheckCircle2,
} from "lucide-react";

export default function Profile() {
    return (
        <AppLayout>
            <div className="p-6 h-full">
                <div className="grid grid-cols-3 grid-rows-2 gap-4 h-full">
                    {/* Primary/featured tile */}
                    <div className="col-span-2 row-span-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl p-6 flex flex-col ">
                        <div className="flex items-center gap-3">
                            <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 text-2xl font-semibold flex items-center justify-center shrink-0">
                                AB
                            </div>

                            <div className="flex w-full items-center justify-between">
                                <div>
                                    <p className="text-lg font-bold dark:text-slate-300">
                                        John Arjay Dacuyan
                                    </p>

                                    <p className="text-sm font-medium">
                                        Admin · RFIMC
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3.5 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 active:bg-blue-200"
                                >
                                    <Pencil size={15} />
                                    Edit Details
                                </button>
                            </div>
                        </div>
                        <div className="border border-slate-200 dark:border-slate-700 mt-6 rounded-xl divide-y divide-slate-200 dark:divide-slate-700 overflow-hidden">
                            <div className="flex items-center gap-3 px-4 py-3">
                                <p className="font-semibold">
                                    Personal Information
                                </p>
                            </div>

                            <div className="flex items-center gap-3 px-4 py-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0">
                                    <Mail size={15} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-xs text-slate-400 dark:text-slate-500">
                                        Email
                                    </span>
                                    <span className="text-sm text-slate-700 dark:text-slate-200 truncate">
                                        johnarjay@gmail.com
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 px-4 py-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0">
                                    <PhoneCall size={15} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-xs text-slate-400 dark:text-slate-500">
                                        Phone
                                    </span>
                                    <span className="text-sm text-slate-700 dark:text-slate-200 truncate">
                                        +63 9990077766
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 px-4 py-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0">
                                    <Building size={15} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-xs text-slate-400 dark:text-slate-500">
                                        Office
                                    </span>
                                    <span className="text-sm text-slate-700 dark:text-slate-200 truncate">
                                        Regional Office 8
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="border border-slate-200 dark:border-slate-700 mt-6 rounded-xl divide-y divide-slate-200 dark:divide-slate-700 overflow-hidden">
                            <div className="flex items-center gap-3 px-4 py-3">
                                <p className="font-semibold">
                                    Password & Security
                                </p>
                            </div>
                            <div className="flex items-center gap-3 px-4 py-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0">
                                    <Lock size={15} />
                                </div>
                                <div className="flex flex-col min-w-0 flex-1">
                                    <span className="text-xs text-slate-400 dark:text-slate-500">
                                        Password
                                    </span>
                                    <span className="text-sm text-slate-700 dark:text-slate-200 truncate">
                                        ••••••••••
                                    </span>
                                </div>
                                <button className="flex items-center gap-1.5 text-xs font-medium border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-md text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-200 dark:hover:border-blue-800 transition-colors shrink-0">
                                    <Pencil size={14} />
                                    Change
                                </button>
                            </div>
                        </div>

                        <div className="border border-slate-200 dark:border-slate-700 mt-6 rounded-xl divide-y divide-slate-200 dark:divide-slate-700 overflow-hidden">
                            <div className="flex flex-col flex-1 px-4 py-3">
                                <p className="font-semibold">My Access</p>
                                <span className="text-xs text-slate-400 dark:text-slate-500">
                                    Your current role and what it lets you do.
                                    Contact an administrator to request changes.
                                </span>
                            </div>
                            <div className="flex items-center gap-3 px-4 py-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0">
                                    <Lock size={15} />
                                </div>
                                <div className="flex flex-col min-w-0 flex-1">
                                    <span className="text-xs text-slate-400 dark:text-slate-500">
                                        Password
                                    </span>
                                    <span className="text-sm text-slate-700 dark:text-slate-200 truncate">
                                        ••••••••••
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Secondary stat tile 1 */}
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Trip Tickets Filed
                            </p>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400">
                                <FileText size={15} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2">
                            128
                        </p>
                    </div>

                    {/* Secondary stat tile 2 */}
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Account Status
                            </p>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 size={15} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                            Active
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
