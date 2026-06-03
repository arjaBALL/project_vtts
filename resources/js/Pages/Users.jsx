import AppLayout from "../Layouts/AppLayout"; // Go up one level, then into Layouts

export default function Users() {
    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Users Page</h1>
                <p>Manage your user here.</p>
            </div>
        </AppLayout>
    );
}
