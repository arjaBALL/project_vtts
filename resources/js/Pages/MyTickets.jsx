import AppLayout from "../Layouts/AppLayout"; // Go up one level, then into Layouts

export default function MyTicket() {
    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold">My Ticket Page</h1>
                <p>Manage your ticket here.</p>
            </div>
        </AppLayout>
    );
}
