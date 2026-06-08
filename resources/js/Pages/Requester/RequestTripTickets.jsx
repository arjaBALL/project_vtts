import AppLayout from "../../Layouts/AppLayout"; // Go up one level, then into Layouts

export default function RequestTripTicket() {
    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Request Trip Ticket Page</h1>
                <p>Manage your trip ticket here.</p>
            </div>
        </AppLayout>
    );
}
