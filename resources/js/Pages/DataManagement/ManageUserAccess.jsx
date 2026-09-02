import AppLayout from "../../Layouts/AppLayout";
import Drawer from "../../components/ui/Drawer";
import { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import toast from "react-hot-toast";
import { PageHeader } from "../../components/ui/PageHeader";
import Pagination from "../../components/ui/Pagination";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

export default function ManageUserAccess() {
    return (
        <AppLayout>
            <div className="p-4 sm:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                    <div className="flex items-start ">
                        <PageHeader
                            title="Manage User Access"
                            description="Manage user permissions and control access to specific actions."
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
