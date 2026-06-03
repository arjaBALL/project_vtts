import AppLayout from "../Layouts/AppLayout"; // Go up one level, then into Layouts

export default function IncomingQueue() {
    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Incoming Queue Page</h1>
                <p>Manage your incoming queue here.</p>
            </div>
        </AppLayout>
    );
}
