import { useState } from "react";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";

export default function AppLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}
            <Sidebar
                mobileOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
            />

            {/* This div must take full width on mobile */}
            <div className="flex flex-col flex-1 min-w-0 w-full">
                <NavBar onMenuClick={() => setMobileOpen((prev) => !prev)} />
                <main className="flex-1 overflow-auto p-0 bg-gray-900 text-white">
                    {children}
                </main>
            </div>
        </div>
    );
}
