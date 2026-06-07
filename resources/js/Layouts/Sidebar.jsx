import { useState } from "react";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { navItems } from "../data/navItems";
import NavIcon from "../components/ui/NavIcons";
import { router } from "@inertiajs/react";

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState("Dashboard");
    const [openMenus, setOpenMenus] = useState({
        "Data Management": false,
    });

    return (
        <div className="relative shrink-0">
            <aside
                className={`relative flex flex-col bg-indigo-50 border-r border-indigo-200 transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden h-screen ${
                    collapsed ? "w-16" : "w-60"
                }`}
            >
                {/* Logo */}
                <div className="flex items-center min-h-16 px-3 gap-3">
                    <div className="w-8 h-8 min-w-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm shrink-0">
                        T
                    </div>
                    <div
                        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
                            collapsed
                                ? "max-w-0 opacity-0"
                                : "max-w-[200px] opacity-100"
                        }`}
                    >
                        <p className="text-sm font-semibold text-indigo-900 m-0">
                            AquaTrip
                        </p>
                        <p className="text-[10px] uppercase tracking-widest text-indigo-400 m-0">
                            Trip ticket Management
                        </p>
                    </div>
                </div>

                {/* Nav */}
                <nav
                    className={`flex-1 overflow-y-auto px-2 py-2 space-y-4 scrollbar-thin scrollbar-thumb-indigo-300 ${
                        collapsed ? "mx-0" : "mx-0"
                    }`}
                >
                    {navItems.map(({ section, items }) => (
                        <div key={section}>
                            {/* Section label */}
                            <p
                                className={`text-[10px] uppercase tracking-widest text-indigo-400 font-semibold px-2 overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                                    collapsed
                                        ? "max-h-0 opacity-0 mb-0 pb-0"
                                        : "max-h-6 opacity-100 mb-1"
                                }`}
                            >
                                {section}
                            </p>

                            {items.map((item) => (
                                <div key={item.label}>
                                    {item.children ? (
                                        <>
                                            {/* Parent button — hidden when collapsed */}
                                            {!collapsed && (
                                                <button
                                                    onClick={() =>
                                                        setOpenMenus(
                                                            (prev) => ({
                                                                ...prev,
                                                                [item.label]:
                                                                    !prev[
                                                                        item
                                                                            .label
                                                                    ],
                                                            }),
                                                        )
                                                    }
                                                    className="w-full flex items-center justify-between text-sm px-2 py-2 rounded-md text-indigo-800 hover:bg-indigo-100"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <NavIcon
                                                            name={item.icon}
                                                        />
                                                        <span>
                                                            {item.label}
                                                        </span>
                                                    </div>
                                                    <ChevronDown
                                                        size={14}
                                                        className={`text-indigo-400 transition-transform duration-200 ${
                                                            openMenus[
                                                                item.label
                                                            ]
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                    />
                                                </button>
                                            )}

                                            {/* Children — only when expanded AND not collapsed */}
                                            {!collapsed &&
                                                openMenus[item.label] && (
                                                    <div className="relative ml-4.5 mt-1 mb-2 space-y-1">
                                                        {/* Vertical connector line */}
                                                        <span className="absolute left-0 top-0 bottom-0 w-px bg-indigo-200" />

                                                        {item.children.map(
                                                            (child) => (
                                                                <button
                                                                    key={
                                                                        child.label
                                                                    }
                                                                    onClick={() => {
                                                                        setActive(
                                                                            child.label,
                                                                        );
                                                                        router.visit(
                                                                            child.href,
                                                                        );
                                                                    }}
                                                                    className={`relative w-full flex items-center gap-2 pl-5 pr-2 py-1.5 text-sm rounded-md group ${
                                                                        active ===
                                                                        child.label
                                                                            ? "bg-white text-indigo-700 shadow-sm"
                                                                            : "text-indigo-700 hover:bg-indigo-100"
                                                                    }`}
                                                                >
                                                                    {/* Horizontal stub + bullet */}
                                                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center">
                                                                        {/* Horizontal line stub */}
                                                                        <span className="w-3 h-px bg-indigo-200 inline-block" />
                                                                        {/* Bullet dot */}
                                                                        <span
                                                                            className={`w-1.5 h-1.5 border rotate-45 border-indigo-300 inline-block -ml-px transition-colors ${
                                                                                active ===
                                                                                child.label
                                                                                    ? "bg-indigo-500 border-indigo-500"
                                                                                    : "bg-indigo-50 group-hover:bg-indigo-300 group-hover:border-indigo-400"
                                                                            }`}
                                                                        />
                                                                    </span>

                                                                    <NavIcon
                                                                        name={
                                                                            child.icon
                                                                        }
                                                                    />
                                                                    <span>
                                                                        {
                                                                            child.label
                                                                        }
                                                                    </span>
                                                                </button>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setActive(item.label);
                                                router.visit(item.href);
                                            }}
                                            className={`w-full flex items-center text-sm rounded-md transition-all mb-1 ${
                                                collapsed
                                                    ? "justify-center px-0 py-2"
                                                    : "justify-start gap-2 px-2 py-2"
                                            } ${
                                                active === item.label
                                                    ? "bg-white text-indigo-700 shadow-sm"
                                                    : "text-indigo-800 hover:bg-indigo-100"
                                            }`}
                                        >
                                            <NavIcon name={item.icon} />
                                            {!collapsed && (
                                                <span>{item.label}</span>
                                            )}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </nav>

                {/* User */}
                <div className="flex items-center gap-3 p-4 border-t border-indigo-200 overflow-hidden mt-auto">
                    <div className="w-8 h-8 min-w-[32px] bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        JD
                    </div>
                    <div
                        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                            collapsed
                                ? "max-w-0 opacity-0"
                                : "max-w-[200px] opacity-100"
                        }`}
                    >
                        <p className="text-xs font-medium text-indigo-900">
                            Juan Dela Cruz
                        </p>
                        <p className="text-[10px] text-indigo-400">Requester</p>
                    </div>
                </div>
            </aside>

            {/* Toggle button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute top-13 -right-3 -translate-y-1/2 w-7 h-7 bg-white border-3 border-indigo-600 rounded-full flex items-center justify-center shadow-sm hover:bg-indigo-100 transition-colors z-10"
                aria-label="Toggle sidebar"
            >
                <ChevronLeft
                    size={16}
                    className={`text-indigo-600 transition-transform duration-300 ${
                        collapsed ? "rotate-180" : ""
                    }`}
                />
            </button>
        </div>
    );
}
