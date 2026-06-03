import AppLayout from "../Layouts/AppLayout"; // Go up one level, then into Layouts

export default function Vehicles() {
    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Vehicles Page</h1>
                <p>Manage your vehicles here.</p>
            </div>
        </AppLayout>
    );
}
