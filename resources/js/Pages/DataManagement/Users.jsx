import AppLayout from "../../Layouts/AppLayout"; // Go up one level, then into Layouts
import Drawer from "../../components/ui/Drawer";
import { useState } from "react";
import { UserPlus2 } from "lucide-react";
import { TextInput, SelectInput } from "../../components/ui/Inputs";

export default function Users() {
    const [open, setOpen] = useState(false);
    return (
        <AppLayout>
            <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold">
                            Users Page
                        </h1>
                        <p className="text-[12px] text-gray-300 mt-1">
                            Users list and management interface will go here.
                            You can add, edit, or remove drivers from this page.
                        </p>
                    </div>
                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition w-fit shrink-0"
                    >
                        <UserPlus2 size={18} />
                        <span>New User</span>
                    </button>
                </div>
                <div className="rounded-lg border border-gray-700 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700 text-center">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">
                                    Office Assignment
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">
                                    Status
                                </th>
                                <th> </th>
                            </tr>
                        </thead>

                        <tbody className="bg-gray-700 divide-y divide-gray-600">
                            <tr>
                                <td className="px-6 py-4 text-sm text-white">
                                    Arjay
                                </td>
                                <td className="px-6 py-4 text-sm text-white">
                                    Main Office
                                </td>
                                <td className="px-6 py-4 text-sm text-white">
                                    Acceptor
                                </td>
                                <td className="px-6 py-4 text-sm text-green-400">
                                    Active
                                </td>
                                <td className="px-6 py-4 text-sm text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="px-3 py-1 text-xs rounded-md bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition">
                                            Edit
                                        </button>

                                        <button className="px-3 py-1 text-xs rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
                            className="px-3 py-1 text-sm border rounded"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </button>

                        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
                            Save
                        </button>
                    </div>
                }
            >
                <p className="mb-0">Details</p>

                <label className="text-[13px] font-medium  tracking-wide text-gray-400 mb-1">
                    First Name:
                </label>
                <TextInput placeholder="First name" className="mb-3" />
                <label className="text-[13px] font-medium  tracking-wide text-gray-400 mb-1">
                    Last Name:
                </label>
                <TextInput placeholder="Last name" className="mb-3" />
                <label className="text-[13px] font-medium  tracking-wide text-gray-400 mb-1">
                    Middle Name:
                </label>
                <TextInput placeholder="Middle name" className="mb-3" />
                <label className="text-[13px] font-medium  tracking-wide text-gray-400 mb-1">
                    Office Assignment:
                </label>
                <SelectInput placeholder="Office Assignment" className="mb-3" />
                <label className="text-[13px] font-medium  tracking-wide text-gray-400 mb-1">
                    License Expiry Date:
                </label>
                <TextInput placeholder="License Expiry Date" className="mb-3" />
            </Drawer>
        </AppLayout>
    );
}
