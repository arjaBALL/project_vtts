import Sidebar from "./Sidebar";
import NavBar from "./NavBar";

export default function AppLayout({ children }) {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />

            <div className="flex flex-col flex-1">
                <NavBar />

                <main className=" flex-1 overflow-auto p-0 bg-gray-900 text-white">
                    {children}
                </main>
            </div>
        </div>
    );
}
