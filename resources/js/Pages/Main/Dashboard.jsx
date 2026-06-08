import AppLayout from "../../Layouts/AppLayout"; // Go up one level, then into Layouts

export default function Dashboard() {
    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Dashboard Page</h1>
                <p>Welcome to your dashboard!</p>
            </div>
        </AppLayout>
    );
}
