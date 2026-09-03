import { useState } from "react";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";
import { Toaster } from "react-hot-toast";

export default function AppLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-900 transition-colors">
            <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={10}
                toastOptions={{
                    duration: 3500,

                    className:
                        "rounded-xl border border-slate-200 bg-white text-slate-800 shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100",

                    style: {
                        padding: "12px 16px",
                        fontSize: "14px",
                        fontWeight: "500",
                        maxWidth: "380px",
                    },

                    success: {
                        duration: 3500,
                        iconTheme: {
                            primary: "#10b981",
                            secondary: "#ffffff",
                        },
                    },

                    error: {
                        duration: 4500,
                        iconTheme: {
                            primary: "#ef4444",
                            secondary: "#ffffff",
                        },
                    },
                }}
            />

            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 dark:bg-black/60 z-20 md:hidden"
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
                <main className="flex-1 overflow-auto p-0 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors">
                    {children}
                </main>
            </div>
        </div>
    );
}
