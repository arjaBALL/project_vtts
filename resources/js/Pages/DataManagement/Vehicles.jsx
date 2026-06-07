import AppLayout from "../../Layouts/AppLayout"; // Go up one level, then into Layouts
import Drawer from "../../components/ui/Drawer";
import { useState } from "react";
import {
    UserRoundKey,
    Trash2Icon,
    PenLine,
    CarFrontIcon,
    FuelIcon,
    CogIcon,
} from "lucide-react";
import { TextInput, SelectInput } from "../../components/ui/Inputs";

export default function Vehicles() {
    const [open, setOpen] = useState(false);
    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Vehicles Page</h1>
                <p className="text-[12px] text-gray-300 mb-3">
                    Vehicles list and management interface will go here. You can
                    add, edit, or remove vehicles from this page.
                </p>
                <div className="mb-4">
                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
                    >
                        <UserRoundKey size={18} />
                        <span>New Vehicle</span>
                    </button>
                </div>
                <div className="rounded-lg border border-gray-700 overflow-hidden">
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
                                    License Expiry
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-400">
                                    Status
                                </th>
                                <th> </th>
                            </tr>
                        </thead>

                        <tbody className="bg-gray-700 divide-y divide-gray-600">
                            <tr>
                                <td className="px-6 py-3 text-sm text-white">
                                    Arjay
                                </td>
                                <td className="px-6 py-3 text-sm text-white">
                                    Main Office
                                </td>
                                <td className="px-6 py-3 text-sm text-white">
                                    2025-12-31
                                </td>
                                <td className="px-6 py-3 text-sm text-green-400">
                                    Active
                                </td>
                                <td className="px-6 py-3 text-sm text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-md bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition">
                                            <PenLine size={12} />
                                            Edit
                                        </button>

                                        <button className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition">
                                            <Trash2Icon size={12} />
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
                title="Add New Vehicle"
                subtitle="Fill in the details of the new Vehicle below."
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
                <p className="mb-0 flex items-center gap-1">
                    <CarFrontIcon size={18} />
                    Vehicel info
                </p>

                <label className="text-[13px] font-medium  tracking-wide text-gray-400 mb-1">
                    Plate no / License plate:
                </label>
                <TextInput placeholder="e . g ABC123" className="mb-3" />
                <label className="text-[13px] font-medium  tracking-wide text-gray-400 mb-1">
                    Vehicle type:
                </label>
                <SelectInput placeholder="Vehicle Type" className="mb-3" />
                <label className="text-[13px] font-medium  tracking-wide text-gray-400 mb-1">
                    Model:
                </label>
                <TextInput placeholder="Model" className="mb-3" />
                <label className="text-[13px] font-medium  tracking-wide text-gray-400 mb-1">
                    Year model:
                </label>
                <SelectInput placeholder="Year model" className="mb-3" />

                <p className="mb-0 flex items-center gap-1">
                    <FuelIcon size={18} />
                    Capacity & Usage
                </p>

                <label className="text-[13px] font-medium  tracking-wide text-gray-400 mb-1">
                    Capacity:
                </label>
                <TextInput placeholder="No. of passengers" className="mb-3" />
                <label className="text-[13px] font-medium  tracking-wide text-gray-400 mb-1">
                    Fuel type:
                </label>
                <SelectInput placeholder="Fuel type" className="mb-3" />
                <label className="text-[13px] font-medium  tracking-wide text-gray-400 mb-1">
                    Fleet card no:
                </label>
                <TextInput placeholder="e . g  123456" className="mb-3" />
                <label className="text-[13px] font-medium  tracking-wide text-gray-400 mb-1">
                    Fuel consumption (Km/L):
                </label>
                <TextInput placeholder="e.g. 12L / 45km" className="mb-3" />
                <label className="text-[13px] font-medium  tracking-wide text-gray-400 mb-1">
                    Assigned office:
                </label>
                <SelectInput placeholder="Assigned office" className="mb-3" />

                <p className="mb-0 flex items-center gap-1">
                    <CogIcon size={18} />
                    Status & Maintenance
                </p>

                <label className="text-[13px] font-medium  tracking-wide text-gray-400 mb-1">
                    Vehicle status:
                </label>
                <SelectInput placeholder="Vehicle status" className="mb-3" />
            </Drawer>
        </AppLayout>
    );
}
