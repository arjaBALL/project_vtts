import AppLayout from "../../Layouts/AppLayout";
import Drawer from "../../components/ui/Drawer";
import { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import toast from "react-hot-toast";
import { PageHeader } from "../../components/ui/PageHeader";
import Pagination from "../../components/ui/Pagination";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    UserPlus2,
    Search,
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react";
import {
    TextInput,
    SelectInput,
    PasswordInput,
} from "../../components/ui/Inputs";

const STATUS_STYLES = {
    active: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30",
    inactive:
        "bg-slate-100 text-slate-500 ring-1 ring-inset ring-slate-500/15 dark:bg-slate-500/10 dark:text-slate-400 dark:ring-slate-500/20",
};

function initials(name) {
    if (!name) return "?";
    return name
        .split(" ")
        .filter(Boolean)
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

export default function Users({ users, offices, filters }) {
    const [open, setOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [query, setQuery] = useState(filters?.search ?? "");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

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
        username: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        office_id: "",
        role: "",
        status: "active",
        password: "",
        password_confirmation: "",
    });

    const validate = () => {
        clearErrors();
        const newErrors = {};

        if (!data.first_name.trim())
            newErrors.first_name = "First name is required.";
        if (!data.last_name.trim())
            newErrors.last_name = "Last name is required.";
        if (!data.username.trim()) newErrors.username = "Username is required.";
        else if (data.username.trim().length < 3)
            newErrors.username = "Username must be at least 3 characters.";
        if (!data.office_id) {
            newErrors.office_id = "Please select an office.";
        }
        if (!data.role) newErrors.role = "Please select a role.";
        if (!userToEdit) {
            if (!data.password) {
                newErrors.password = "Password is required.";
            } else if (data.password.length < 8) {
                newErrors.password = "Password must be at least 8 characters.";
            }

            if (data.password !== data.password_confirmation) {
                newErrors.password_confirmation = "Passwords do not match.";
            }
        } else {
            // Password is optional when editing
            if (data.password && data.password.length < 8) {
                newErrors.password = "Password must be at least 8 characters.";
            }

            if (data.password && data.password !== data.password_confirmation) {
                newErrors.password_confirmation = "Passwords do not match.";
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

    const handleEdit = (user) => {
        setUserToEdit(user);

        setData({
            username: user.username ?? "",
            first_name: user.first_name ?? "",
            middle_name: user.middle_name ?? "",
            last_name: user.last_name ?? "",
            office_id: user.office_id ?? "",
            role: user.role ?? "",
            status: user.status ?? "active",
            password: "",
            password_confirmation: "",
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

        if (userToEdit) {
            router.put(`/users/${userToEdit.id}`, data, {
                onSuccess: () => {
                    reset();
                    setUserToEdit(null);
                    setOpen(false);
                    toast.success("User updated successfully.");
                },

                onError: () => {
                    toast.error("Something went wrong. Please check the form.");
                },
            });
        } else {
            post("/users", {
                onSuccess: () => {
                    reset();
                    setOpen(false);
                    toast.success("User created successfully.");
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
            "/users",
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

    const handleDelete = (user) => {
        setUserToDelete(user);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (!userToDelete) return;

        router.delete(`/users/${userToDelete.id}`, {
            preserveScroll: true,

            onSuccess: () => {
                toast.success("User deleted successfully.");
                setDeleteDialogOpen(false);
                setUserToDelete(null);
            },

            onError: () => {
                toast.error("Failed to delete user. Please try again.");
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
                            title="Manage Users"
                            description="Add new users, manage accounts, and assign user roles."
                        />
                    </div>
                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm shadow-blue-600/20 w-fit shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
                    >
                        <UserPlus2 size={17} />
                        <span>New User</span>
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
                            placeholder="Search by name or role..."
                            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                        />
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 ml-auto hidden sm:block">
                        Showing {users.from ?? 0}–{users.to ?? 0} of{" "}
                        {users.total ?? 0} users
                    </p>
                </div>

                {/* Table */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-fixed divide-y divide-slate-200 dark:divide-slate-700 text-center">
                            <thead className="bg-slate-50 dark:bg-slate-900/40">
                                <tr>
                                    <th className="w-10 px-4 py-3 align-middle">
                                        <input
                                            type="checkbox"
                                            className="rounded border-slate-300 ..."
                                        />
                                    </th>
                                    <th className="w-12 px-2 py-3 align-middle"></th>
                                    <th className="w-32 px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 align-middle">
                                        Username
                                    </th>
                                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 align-middle">
                                        Name
                                    </th>
                                    <th className="w-20 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 align-middle">
                                        Office
                                    </th>
                                    <th className="w-28 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 align-middle">
                                        Role
                                    </th>
                                    <th className="w-28 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 align-middle">
                                        Status
                                    </th>
                                    <th className="w-24 px-5 py-3 align-middle">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                                {users.data.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors"
                                    >
                                        <td className="px-4 py-3.5 align-middle text-center">
                                            <input
                                                type="checkbox"
                                                className="rounded border-slate-300 ..."
                                            />
                                        </td>
                                        <td className="px-2 py-3.5 align-middle">
                                            <div className="w-8 h-8 mx-auto rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 text-xs font-semibold flex items-center justify-center shrink-0">
                                                {initials(
                                                    `${user.first_name} ${user.middle_name ?? ""} ${user.last_name}`,
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-3 py-3.5 text-sm text-slate-600 dark:text-slate-400 truncate align-middle text-center">
                                            {user.username}
                                        </td>
                                        <td className="px-5 py-3.5 align-middle text-center">
                                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate text-center">
                                                {user.first_name}{" "}
                                                {user.middle_name
                                                    ? `${user.middle_name} `
                                                    : ""}
                                                {user.last_name}
                                            </p>
                                        </td>
                                        <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-400 truncate align-middle text-center">
                                            {user.abbreviation}
                                        </td>
                                        <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-400 truncate align-middle text-center">
                                            {user.role}
                                        </td>
                                        <td className="px-5 py-3.5 align-middle text-center">
                                            <StatusBadge status={user.status} />
                                        </td>
                                        <td className="px-5 py-3.5 align-middle">
                                            <div className="flex justify-center gap-1.5">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(user)
                                                    }
                                                    className="p-1.5 rounded-md text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                                                    aria-label={`Edit ${user.id}`}
                                                >
                                                    <Pencil size={15} />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(user)
                                                    }
                                                    className="p-1.5 rounded-md text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                                    aria-label={`Delete ${user.first_name} ${user.last_name}`}
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <button
                                                            className="p-1.5 rounded-md text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
                                                            aria-label={`More actions for ${user.id}`}
                                                        >
                                                            <MoreHorizontal
                                                                size={15}
                                                            />
                                                        </button>
                                                    </PopoverTrigger>

                                                    <PopoverContent
                                                        align="end"
                                                        className="w-40 p-1"
                                                    >
                                                        <button
                                                            className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                                                            onClick={() =>
                                                                handleEdit(user)
                                                            }
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                                                            onClick={() =>
                                                                handleView(user)
                                                            }
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            className="w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    user,
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {users.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="px-5 py-12 text-center"
                                        >
                                            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                                No users found
                                            </p>
                                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                                                Try a different search, or add a
                                                new user.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <Pagination links={users.links} />
                </div>
            </div>

            <Drawer
                open={open}
                onClose={() => {
                    setOpen(false);
                    setUserToEdit(null);
                    reset();
                    clearErrors();
                }}
                title={userToEdit ? "Edit User" : "Add New User"}
                subtitle={
                    userToEdit
                        ? "Update the user's information below."
                        : "Fill in the details of the new user below."
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
                                : userToEdit
                                  ? "Update"
                                  : "Save"}
                        </button>
                    </div>
                }
            >
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Details
                </p>

                <form action="" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-x-3">
                        <Field label="First Name" htmlFor="first_name">
                            <TextInput
                                id="first_name"
                                name="first_name"
                                placeholder="First name"
                                value={data.first_name}
                                onChange={(e) =>
                                    setData("first_name", e.target.value)
                                }
                            />
                            {errors.first_name && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.first_name}
                                </p>
                            )}
                        </Field>
                        <Field label="Last Name" htmlFor="last_name">
                            <TextInput
                                id="last_name"
                                name="last_name"
                                placeholder="Last name"
                                value={data.last_name}
                                onChange={(e) =>
                                    setData("last_name", e.target.value)
                                }
                            />
                            {errors.last_name && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.last_name}
                                </p>
                            )}
                        </Field>
                    </div>

                    <Field label="Middle Name" htmlFor="middle_name">
                        <TextInput
                            id="middle_name"
                            name="middle_name"
                            placeholder="Middle name"
                            value={data.middle_name}
                            onChange={(e) =>
                                setData("middle_name", e.target.value)
                            }
                        />
                        {errors.middle_name && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.middle_name}
                            </p>
                        )}
                    </Field>

                    <Field label="Username" htmlFor="username">
                        <TextInput
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={data.username}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                        />
                        {errors.username && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.username}
                            </p>
                        )}
                    </Field>

                    <Field label="Office" htmlFor="office">
                        <SelectInput
                            id="office_id"
                            name="office_id"
                            placeholder="Select office"
                            value={data.office_id}
                            onChange={(e) =>
                                setData("office_id", e.target.value)
                            }
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

                    <Field label="Role" htmlFor="role">
                        <SelectInput
                            id="role"
                            name="role"
                            placeholder="Select role"
                            value={data.role}
                            onChange={(e) => setData("role", e.target.value)}
                        >
                            <option value="">Select role</option>
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                            <option value="user">User</option>
                            <option value="driver">Driver</option>
                        </SelectInput>
                        {errors.role && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.role}
                            </p>
                        )}
                    </Field>
                    {userToEdit && (
                        <Field label="Status" htmlFor="status">
                            <SelectInput
                                id="status"
                                name="status"
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </SelectInput>
                            {errors.status && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.status}
                                </p>
                            )}
                        </Field>
                    )}

                    {!userToEdit && (
                        <>
                            <Field label="Password" htmlFor="password">
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    placeholder="Enter password"
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                {errors.password && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </Field>

                            <Field
                                label="Confirm Password"
                                htmlFor="password_confirmation"
                            >
                                <TextInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    placeholder="Confirm password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value,
                                        )
                                    }
                                />

                                {errors.password_confirmation && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </Field>
                        </>
                    )}
                </form>
            </Drawer>
            <ConfirmDialog
                open={deleteDialogOpen}
                onOpenChange={(open) => {
                    setDeleteDialogOpen(open);

                    if (!open) {
                        setUserToDelete(null);
                    }
                }}
                title="Delete user?"
                description={
                    userToDelete
                        ? `Delete ${userToDelete.first_name} ${userToDelete.last_name}? This can be undone by an admin.`
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
