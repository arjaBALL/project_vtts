import { useEffect, useMemo, useState } from "react";
import {
    ChevronLeft,
    ChevronDown,
    LogOut,
    Settings,
    User,
    HelpCircle,
} from "lucide-react";
import { navItems } from "../data/navItems";
import NavIcon from "../components/ui/NavIcons";
import { router, usePage } from "@inertiajs/react";

export default function Sidebar({ mobileOpen, onClose }) {
    const { url } = usePage();
    const currentPath = url?.split("?")[0] ?? "";

    const [collapsed, setCollapsed] = useState(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem("sidebar:collapsed") === "1";
    });
    const [hoveredParent, setHoveredParent] = useState(null);
    const [hoveredTooltip, setHoveredTooltip] = useState(null);

    const isActiveHref = (href) =>
        !!href &&
        (currentPath === href ||
            currentPath.startsWith(href.endsWith("/") ? href : href + "/"));

    const isParentActive = (item) =>
        item.children?.some((child) => isActiveHref(child.href)) ?? false;

    const [openMenus, setOpenMenus] = useState({});
    useEffect(() => {
        const activeParent = navItems
            .flatMap((s) => s.items)
            .find((item) => item.children && isParentActive(item));
        if (activeParent) {
            setOpenMenus((prev) => ({ ...prev, [activeParent.label]: true }));
        }
    }, [currentPath]);

    useEffect(() => {
        localStorage.setItem("sidebar:collapsed", collapsed ? "1" : "0");
    }, [collapsed]);

    const go = (href) => {
        router.visit(href);
        onClose?.();
    };

    return (
        <div className="md:relative md:shrink-0 overflow-visible">
            {/* Mobile scrim with blur */}
            {mobileOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-20 md:hidden animate-in fade-in duration-200"
                />
            )}

            <aside
                className={`
                    fixed md:relative z-30 flex flex-col bg-gradient-to-b from-white to-slate-50/80 border-r border-slate-200/80
                    transition-[width,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                    overflow-visible h-screen shadow-2xl shadow-slate-900/10 md:shadow-sm
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                    ${collapsed ? "md:w-[72px]" : "md:w-[280px]"}
                    w-[280px]
                `}
            >
                {/* Logo with gradient accent */}
                <div className="flex items-center h-16 shrink-0 px-4 gap-3 border-b border-slate-200/60 bg-gradient-to-r from-teal-600/5 to-transparent">
                    <div className="relative w-9 h-9 min-w-9 rounded-xl bg-gradient-to-br from-teal-600 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-teal-500/25">
                        T
                        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
                    </div>
                    <div
                        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
                            collapsed
                                ? "max-w-0 opacity-0"
                                : "max-w-[200px] opacity-100"
                        }`}
                    >
                        <p className="text-[14px] font-bold text-slate-900 m-0 leading-tight tracking-tight">
                            AquaTrip
                        </p>
                        <p className="text-[10.5px] text-slate-400 m-0 font-medium tracking-wide">
                            Trip Ticket Management
                        </p>
                    </div>
                </div>

                {/* Nav with improved spacing */}
                <nav className="flex-1 overflow-y-auto overflow-x-visible px-3 py-5 space-y-5 [scrollbar-width:thin] [scrollbar-color:theme(colors.slate.200)_transparent] hover:[scrollbar-color:theme(colors.slate.300)_transparent]">
                    {navItems.map(({ section, items }) => (
                        <div key={section}>
                            {/* Section label with dot */}
                            {!collapsed ? (
                                <div className="flex items-center gap-2 px-3 mb-2">
                                    <span className="w-1 h-1 rounded-full bg-teal-400" />
                                    <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-semibold">
                                        {section}
                                    </p>
                                </div>
                            ) : (
                                <div className="mx-3 mb-3 border-t border-slate-200/60" />
                            )}

                            <div className="space-y-0.5">
                                {items.map((item) => {
                                    const active = item.children
                                        ? isParentActive(item)
                                        : isActiveHref(item.href);

                                    return (
                                        <div
                                            key={item.label}
                                            className="relative"
                                            onMouseEnter={() => {
                                                if (collapsed) {
                                                    setHoveredParent(
                                                        item.label,
                                                    );
                                                }
                                            }}
                                            onMouseLeave={() => {
                                                if (collapsed) {
                                                    setHoveredParent(null);
                                                    setHoveredTooltip(null);
                                                }
                                            }}
                                        >
                                            {item.children ? (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            !collapsed &&
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
                                                        aria-expanded={
                                                            !!openMenus[
                                                                item.label
                                                            ]
                                                        }
                                                        className={`w-full flex items-center rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 ${
                                                            collapsed
                                                                ? "justify-center px-0 py-2.5"
                                                                : "justify-between px-3 py-2.5"
                                                        } ${
                                                            active
                                                                ? "text-slate-900 bg-gradient-to-r from-teal-50/80 to-transparent"
                                                                : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className={`${active ? "text-teal-600" : "text-slate-400"} transition-colors duration-200`}
                                                            >
                                                                <NavIcon
                                                                    name={
                                                                        item.icon
                                                                    }
                                                                />
                                                            </div>
                                                            {!collapsed && (
                                                                <span className="text-[13.5px]">
                                                                    {item.label}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {!collapsed && (
                                                            <ChevronDown
                                                                size={15}
                                                                className={`text-slate-400 transition-transform duration-300 ${
                                                                    openMenus[
                                                                        item
                                                                            .label
                                                                    ]
                                                                        ? "rotate-180"
                                                                        : ""
                                                                }`}
                                                            />
                                                        )}
                                                    </button>

                                                    {/* Expanded children with card-like appearance */}
                                                    {!collapsed &&
                                                        openMenus[
                                                            item.label
                                                        ] && (
                                                            <div className="relative ml-[27px] mt-1 mb-1.5 space-y-0.5 bg-slate-50/50 rounded-xl p-1">
                                                                <div className="absolute left-2.5 top-2 bottom-2 w-[2px] bg-gradient-to-b from-teal-400/40 to-transparent rounded-full" />
                                                                {item.children.map(
                                                                    (child) => {
                                                                        const childActive =
                                                                            isActiveHref(
                                                                                child.href,
                                                                            );
                                                                        return (
                                                                            <button
                                                                                key={
                                                                                    child.label
                                                                                }
                                                                                onClick={() =>
                                                                                    go(
                                                                                        child.href,
                                                                                    )
                                                                                }
                                                                                aria-current={
                                                                                    childActive
                                                                                        ? "page"
                                                                                        : undefined
                                                                                }
                                                                                className={`relative w-full flex items-center gap-2.5 pl-5 pr-3 py-2 text-sm rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 ${
                                                                                    childActive
                                                                                        ? "bg-white shadow-sm text-teal-700 font-medium"
                                                                                        : "text-slate-500 font-normal hover:bg-white/80 hover:text-slate-800"
                                                                                }`}
                                                                            >
                                                                                <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center">
                                                                                    <span
                                                                                        className={`w-2 h-[2px] rounded-full transition-all duration-200 ${
                                                                                            childActive
                                                                                                ? "bg-teal-500 w-3"
                                                                                                : "bg-slate-300"
                                                                                        }`}
                                                                                    />
                                                                                </span>
                                                                                <span className="ml-1.5">
                                                                                    <NavIcon
                                                                                        name={
                                                                                            child.icon
                                                                                        }
                                                                                        className={`${
                                                                                            childActive
                                                                                                ? "text-teal-600"
                                                                                                : "text-slate-400"
                                                                                        }`}
                                                                                    />
                                                                                </span>
                                                                                <span className="text-[13px]">
                                                                                    {
                                                                                        child.label
                                                                                    }
                                                                                </span>
                                                                            </button>
                                                                        );
                                                                    },
                                                                )}
                                                            </div>
                                                        )}

                                                    {/* Collapsed: enhanced flyout */}
                                                    {collapsed &&
                                                        hoveredParent ===
                                                            item.label && (
                                                            <div
                                                                className="absolute left-full top-0 ml-3 w-56 py-2 bg-white border border-slate-200/80 rounded-2xl shadow-2xl shadow-slate-900/15 z-50 animate-in slide-in-from-left-2 duration-200"
                                                                onMouseEnter={() =>
                                                                    setHoveredTooltip(
                                                                        item.label,
                                                                    )
                                                                }
                                                                onMouseLeave={() =>
                                                                    setHoveredTooltip(
                                                                        null,
                                                                    )
                                                                }
                                                            >
                                                                <div className="px-3 py-2 border-b border-slate-100">
                                                                    <p className="text-[10px] uppercase tracking-[0.12em] text-slate-400 font-semibold">
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="py-1">
                                                                    {item.children.map(
                                                                        (
                                                                            child,
                                                                        ) => {
                                                                            const childActive =
                                                                                isActiveHref(
                                                                                    child.href,
                                                                                );
                                                                            return (
                                                                                <button
                                                                                    key={
                                                                                        child.label
                                                                                    }
                                                                                    onClick={() =>
                                                                                        go(
                                                                                            child.href,
                                                                                        )
                                                                                    }
                                                                                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left transition-all duration-150 ${
                                                                                        childActive
                                                                                            ? "bg-teal-50 text-teal-700 font-medium"
                                                                                            : "text-slate-600 hover:bg-slate-50"
                                                                                    } ${
                                                                                        childActive
                                                                                            ? "border-l-2 border-teal-500"
                                                                                            : ""
                                                                                    }`}
                                                                                >
                                                                                    <NavIcon
                                                                                        name={
                                                                                            child.icon
                                                                                        }
                                                                                        className={`${
                                                                                            childActive
                                                                                                ? "text-teal-600"
                                                                                                : "text-slate-400"
                                                                                        }`}
                                                                                    />
                                                                                    <span className="text-[13px]">
                                                                                        {
                                                                                            child.label
                                                                                        }
                                                                                    </span>
                                                                                </button>
                                                                            );
                                                                        },
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        go(item.href)
                                                    }
                                                    aria-current={
                                                        active
                                                            ? "page"
                                                            : undefined
                                                    }
                                                    className={`relative w-full flex items-center text-sm font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 group ${
                                                        collapsed
                                                            ? "justify-center px-0 py-2.5"
                                                            : "justify-start gap-3 px-3 py-2.5"
                                                    } ${
                                                        active
                                                            ? "bg-gradient-to-r from-teal-50/80 to-transparent text-teal-700 shadow-sm"
                                                            : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                                                    }`}
                                                >
                                                    {active && (
                                                        <span
                                                            className={`absolute bg-gradient-to-b from-teal-500 to-teal-600 rounded-full shadow-md shadow-teal-500/30 ${
                                                                collapsed
                                                                    ? "left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5"
                                                                    : "left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full"
                                                            }`}
                                                        />
                                                    )}
                                                    <div
                                                        className={`${active ? "text-teal-600" : "text-slate-400"} transition-colors duration-200 group-hover:${!active ? "text-slate-500" : ""}`}
                                                    >
                                                        <NavIcon
                                                            name={item.icon}
                                                        />
                                                    </div>
                                                    {!collapsed && (
                                                        <span className="text-[13.5px]">
                                                            {item.label}
                                                        </span>
                                                    )}
                                                </button>
                                            )}

                                            {/* Collapsed: enhanced tooltip for leaf items */}
                                            {collapsed &&
                                                !item.children &&
                                                hoveredParent ===
                                                    item.label && (
                                                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-medium whitespace-nowrap shadow-xl z-50 animate-in slide-in-from-left-2 duration-150">
                                                        {item.label}
                                                        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45" />
                                                    </div>
                                                )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* User section with improved design */}
                <div
                    className={`flex items-center gap-3 border-t border-slate-200/60 bg-gradient-to-b from-transparent to-slate-50/50 shrink-0 ${
                        collapsed ? "justify-center p-3" : "p-4"
                    }`}
                >
                    <div className="relative shrink-0 group cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-600 to-teal-500 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-teal-500/20 transition-transform duration-200 group-hover:scale-105">
                            JD
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white shadow-sm shadow-emerald-400/40" />
                        <div className="absolute inset-0 rounded-full ring-2 ring-teal-500/20 group-hover:ring-teal-500/40 transition-all duration-200" />
                    </div>
                    <div
                        className={`flex-1 overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                            collapsed
                                ? "max-w-0 opacity-0"
                                : "max-w-[160px] opacity-100"
                        }`}
                    >
                        <p className="text-[13px] font-semibold text-slate-800 truncate">
                            Juan Dela Cruz
                        </p>
                        <p className="text-[10.5px] text-slate-400 font-medium flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" />
                            Requester
                        </p>
                    </div>
                    {!collapsed && (
                        <div className="flex items-center gap-1">
                            <button
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
                                aria-label="Settings"
                            >
                                <Settings size={16} />
                            </button>
                            <button
                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                                aria-label="Log out"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {/* Toggle button with improved design */}
            <button
                onClick={() => setCollapsed((v) => !v)}
                className="hidden md:flex absolute top-8 -right-3.5 -translate-y-1/2 w-7 h-7 bg-white border-2 border-slate-200/80 rounded-full items-center justify-center shadow-md hover:shadow-lg hover:border-teal-400 hover:bg-teal-50 transition-all duration-300 z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 group"
                aria-label="Toggle sidebar"
            >
                <ChevronLeft
                    size={14}
                    className={`text-slate-500 transition-all duration-300 group-hover:text-teal-600 ${
                        collapsed ? "rotate-180" : ""
                    }`}
                />
            </button>
        </div>
    );
}
