import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, LogOut, Settings, X } from "lucide-react";
import { router, usePage } from "@inertiajs/react";

import { navItems } from "../data/navItems";
import NavIcon from "../components/ui/NavIcons";

export default function Sidebar({ mobileOpen, onClose }) {
    const { url } = usePage();

    const currentPath = useMemo(() => url?.split("?")[0] ?? "", [url]);

    const [collapsed, setCollapsed] = useState(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem("sidebar:collapsed") === "1";
    });

    const [openMenus, setOpenMenus] = useState({});
    const [hoveredItem, setHoveredItem] = useState(null);

    const isActiveHref = (href) => {
        if (!href) return false;

        return (
            currentPath === href ||
            currentPath.startsWith(href.endsWith("/") ? href : `${href}/`)
        );
    };

    const isParentActive = (item) =>
        item.children?.some((child) => isActiveHref(child.href)) ?? false;

    const activeParents = useMemo(() => {
        const result = {};

        navItems.forEach(({ items }) => {
            items.forEach((item) => {
                if (item.children && isParentActive(item)) {
                    result[item.label] = true;
                }
            });
        });

        return result;
    }, [currentPath]);

    useEffect(() => {
        setOpenMenus((prev) => ({
            ...prev,
            ...activeParents,
        }));
    }, [activeParents]);

    useEffect(() => {
        localStorage.setItem("sidebar:collapsed", collapsed ? "1" : "0");
    }, [collapsed]);

    const toggleMenu = (label) => {
        setOpenMenus((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    const go = (href) => {
        if (!href) return;

        router.visit(href);
        onClose?.();
    };

    const handleItemMouseEnter = (label) => {
        if (collapsed) {
            setHoveredItem(label);
        }
    };

    const handleItemMouseLeave = () => {
        if (collapsed) {
            setHoveredItem(null);
        }
    };

    return (
        <div className="relative md:shrink-0 overflow-visible">
            {/* Mobile backdrop */}
            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm md:hidden"
                />
            )}

            <aside
                aria-label="Main navigation"
                className={`
                    fixed md:relative inset-y-0 left-0 z-50
                    flex h-screen flex-col
                    bg-white dark:bg-slate-900
                    border-r border-slate-200 dark:border-slate-700
                    shadow-xl shadow-slate-900/5 dark:shadow-black/20
                    transition-[width,transform] duration-300
                    ease-[cubic-bezier(0.4,0,0.2,1)]
                    overflow-visible

                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0

                    ${collapsed ? "md:w-[76px]" : "md:w-[280px]"}
                    w-[280px]
                `}
            >
                {/* Header */}
                <div
                    className={`
                        flex h-16 shrink-0 items-center
                        border-b border-slate-200 dark:border-slate-700
                        ${collapsed ? "justify-center px-3" : "px-4"}
                    `}
                >
                    <div className="flex items-center gap-3 min-w-0">
                        {/* Logo */}
                        <div
                            className="
                                relative flex h-9 w-9 shrink-0
                                items-center justify-center
                                rounded-xl
                                bg-gradient-to-br from-teal-600 to-teal-500
                                text-sm font-bold text-white
                                shadow-md shadow-teal-500/20
                            "
                        >
                            T
                            <span
                                className="
                                    absolute -right-0.5 -top-0.5
                                    h-2.5 w-2.5
                                    rounded-full
                                    border-2 border-white dark:border-slate-900
                                    bg-emerald-400
                                "
                            />
                        </div>

                        {!collapsed && (
                            <div className="min-w-0">
                                <p className="truncate text-[14px] font-bold leading-tight text-slate-900 dark:text-slate-100">
                                    AquaTrip
                                </p>

                                <p className="truncate text-[10px] font-medium tracking-wide text-slate-400 dark:text-slate-500">
                                    Trip Ticket Management
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Mobile close */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            ml-auto rounded-lg p-2
                            text-slate-400 dark:text-slate-500
                            transition-colors
                            hover:bg-slate-100 hover:text-slate-700
                            dark:hover:bg-slate-800 dark:hover:text-slate-200
                            md:hidden
                        "
                        aria-label="Close sidebar"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Navigation */}
                <nav
                    className="
                        flex-1 overflow-y-auto overflow-x-visible
                        px-3 py-5
                        [scrollbar-width:thin]
                        [scrollbar-color:theme(colors.slate.200)_transparent]
                        dark:[scrollbar-color:theme(colors.slate.700)_transparent]
                    "
                >
                    <div className="space-y-6">
                        {navItems.map(({ section, items }) => (
                            <section key={section}>
                                {/* Section title */}
                                {!collapsed ? (
                                    <div className="mb-2 flex items-center gap-2 px-3">
                                        <span className="h-1 w-1 rounded-full bg-teal-500" />

                                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
                                            {section}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="mx-3 mb-3 border-t border-slate-200 dark:border-slate-700" />
                                )}

                                <div className="space-y-1">
                                    {items.map((item) => {
                                        const active = item.children
                                            ? isParentActive(item)
                                            : isActiveHref(item.href);

                                        const isOpen = !!openMenus[item.label];

                                        const isHovered =
                                            hoveredItem === item.label;

                                        return (
                                            <div
                                                key={item.label}
                                                className="relative"
                                                onMouseEnter={() =>
                                                    handleItemMouseEnter(
                                                        item.label,
                                                    )
                                                }
                                                onMouseLeave={
                                                    handleItemMouseLeave
                                                }
                                            >
                                                {/* Parent item */}
                                                <div
                                                    className={`
                                                        group relative
                                                        flex items-center
                                                        rounded-xl
                                                        transition-colors
                                                        duration-150

                                                        ${
                                                            active
                                                                ? "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400"
                                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                                                        }

                                                        ${
                                                            collapsed
                                                                ? "justify-center"
                                                                : ""
                                                        }
                                                    `}
                                                >
                                                    {/* Active indicator */}
                                                    {active && (
                                                        <span
                                                            className="
                                                                absolute left-0
                                                                top-1/2
                                                                h-5 w-[3px]
                                                                -translate-y-1/2
                                                                rounded-r-full
                                                                bg-teal-500
                                                            "
                                                        />
                                                    )}

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (item.children) {
                                                                if (collapsed) {
                                                                    setHoveredItem(
                                                                        item.label,
                                                                    );
                                                                    return;
                                                                }

                                                                toggleMenu(
                                                                    item.label,
                                                                );
                                                            } else {
                                                                go(item.href);
                                                            }
                                                        }}
                                                        aria-current={
                                                            !item.children &&
                                                            active
                                                                ? "page"
                                                                : undefined
                                                        }
                                                        aria-expanded={
                                                            item.children
                                                                ? isOpen
                                                                : undefined
                                                        }
                                                        className={`
                                                            flex min-h-11 flex-1
                                                            items-center
                                                            focus-visible:outline-none
                                                            focus-visible:ring-2
                                                            focus-visible:ring-teal-500/40
                                                            ${
                                                                collapsed
                                                                    ? "justify-center px-0"
                                                                    : "gap-3 px-3"
                                                            }
                                                        `}
                                                    >
                                                        <NavIcon
                                                            name={item.icon}
                                                            className={`
                                                                shrink-0
                                                                transition-colors
                                                                ${
                                                                    active
                                                                        ? "text-teal-600 dark:text-teal-400"
                                                                        : "text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-400"
                                                                }
                                                            `}
                                                        />

                                                        {!collapsed && (
                                                            <span className="truncate text-[13.5px] font-medium">
                                                                {item.label}
                                                            </span>
                                                        )}
                                                    </button>

                                                    {/* Expand button */}
                                                    {item.children &&
                                                        !collapsed && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    toggleMenu(
                                                                        item.label,
                                                                    )
                                                                }
                                                                aria-label={`${
                                                                    isOpen
                                                                        ? "Collapse"
                                                                        : "Expand"
                                                                } ${item.label}`}
                                                                className="
                                                                    mr-1.5
                                                                    rounded-lg
                                                                    p-2
                                                                    text-slate-400 dark:text-slate-500
                                                                    hover:bg-white hover:text-slate-600
                                                                    dark:hover:bg-slate-700 dark:hover:text-slate-300
                                                                "
                                                            >
                                                                <ChevronDown
                                                                    size={15}
                                                                    className={`
                                                                        transition-transform
                                                                        duration-200
                                                                        ${
                                                                            isOpen
                                                                                ? "rotate-180"
                                                                                : ""
                                                                        }
                                                                    `}
                                                                />
                                                            </button>
                                                        )}
                                                </div>

                                                {/* Expanded children */}
                                                {item.children &&
                                                    !collapsed &&
                                                    isOpen && (
                                                        <div className="relative ml-5 mt-1 space-y-0.5 border-l border-slate-200 dark:border-slate-700 pl-3">
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
                                                                            type="button"
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
                                                                            className={`
                                                                                group
                                                                                relative
                                                                                flex
                                                                                w-full
                                                                                items-center
                                                                                gap-2.5
                                                                                rounded-lg
                                                                                px-3
                                                                                py-2
                                                                                text-left
                                                                                transition-colors
                                                                                duration-150
                                                                                focus-visible:outline-none
                                                                                focus-visible:ring-2
                                                                                focus-visible:ring-teal-500/40

                                                                                ${
                                                                                    childActive
                                                                                        ? "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400"
                                                                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                                                                                }
                                                                            `}
                                                                        >
                                                                            <NavIcon
                                                                                name={
                                                                                    child.icon
                                                                                }
                                                                                className={
                                                                                    childActive
                                                                                        ? "text-teal-600 dark:text-teal-400"
                                                                                        : "text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-400"
                                                                                }
                                                                            />

                                                                            <span className="truncate text-[13px]">
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

                                                {/* Collapsed flyout */}
                                                {item.children &&
                                                    collapsed &&
                                                    isHovered && (
                                                        <div
                                                            className="
                                                                absolute left-full
                                                                top-0 ml-3
                                                                z-[100]
                                                                w-60
                                                                rounded-xl
                                                                border border-slate-200 dark:border-slate-700
                                                                bg-white dark:bg-slate-800
                                                                p-2
                                                                shadow-xl
                                                            "
                                                            onMouseEnter={() =>
                                                                setHoveredItem(
                                                                    item.label,
                                                                )
                                                            }
                                                            onMouseLeave={() =>
                                                                setHoveredItem(
                                                                    null,
                                                                )
                                                            }
                                                        >
                                                            <div className="px-3 py-2">
                                                                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                                                                    {item.label}
                                                                </p>
                                                            </div>

                                                            <div className="space-y-0.5">
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
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    go(
                                                                                        child.href,
                                                                                    )
                                                                                }
                                                                                className={`
                                                                                    flex
                                                                                    w-full
                                                                                    items-center
                                                                                    gap-3
                                                                                    rounded-lg
                                                                                    px-3
                                                                                    py-2.5
                                                                                    text-left
                                                                                    text-[13px]
                                                                                    transition-colors

                                                                                    ${
                                                                                        childActive
                                                                                            ? "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400"
                                                                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100"
                                                                                    }
                                                                                `}
                                                                            >
                                                                                <NavIcon
                                                                                    name={
                                                                                        child.icon
                                                                                    }
                                                                                    className={
                                                                                        childActive
                                                                                            ? "text-teal-600 dark:text-teal-400"
                                                                                            : "text-slate-400 dark:text-slate-500"
                                                                                    }
                                                                                />

                                                                                <span className="truncate">
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

                                                {/* Collapsed tooltip */}
                                                {!item.children &&
                                                    collapsed &&
                                                    isHovered && (
                                                        <div
                                                            className="
                                                                absolute left-full
                                                                top-1/2
                                                                z-[100]
                                                                ml-3
                                                                -translate-y-1/2
                                                                whitespace-nowrap
                                                                rounded-lg
                                                                bg-slate-900 dark:bg-slate-700
                                                                px-3 py-2
                                                                text-xs
                                                                font-medium
                                                                text-white
                                                                shadow-lg
                                                            "
                                                        >
                                                            {item.label}

                                                            <span
                                                                className="
                                                                    absolute
                                                                    -left-1
                                                                    top-1/2
                                                                    h-2 w-2
                                                                    -translate-y-1/2
                                                                    rotate-45
                                                                    bg-slate-900 dark:bg-slate-700
                                                                "
                                                            />
                                                        </div>
                                                    )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        ))}
                    </div>
                </nav>

                {/* User footer */}
                <div
                    className={`
                        shrink-0
                        border-t border-slate-200 dark:border-slate-700
                        bg-slate-50/50 dark:bg-slate-800/50
                        ${collapsed ? "p-3" : "p-4"}
                    `}
                >
                    <div
                        className={`
                            flex items-center
                            ${collapsed ? "justify-center" : "gap-3"}
                        `}
                    >
                        {/* Avatar */}
                        <button
                            type="button"
                            className="group relative shrink-0"
                            aria-label="Open profile"
                        >
                            <div
                                className="
                                    flex h-10 w-10
                                    items-center justify-center
                                    rounded-full
                                    bg-gradient-to-br
                                    from-teal-600 to-teal-500
                                    text-xs font-bold text-white
                                    shadow-md shadow-teal-500/20
                                "
                            >
                                JD
                            </div>

                            <span
                                className="
                                    absolute bottom-0 right-0
                                    h-3 w-3
                                    rounded-full
                                    border-2 border-white dark:border-slate-900
                                    bg-emerald-400
                                "
                            />
                        </button>

                        {!collapsed && (
                            <>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-[13px] font-semibold text-slate-800 dark:text-slate-200">
                                        Juan Dela Cruz
                                    </p>

                                    <p className="flex items-center gap-1 text-[10.5px] font-medium text-slate-400 dark:text-slate-500">
                                        <span className="h-1 w-1 rounded-full bg-emerald-400" />
                                        Requester
                                    </p>
                                </div>

                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        aria-label="Settings"
                                        className="
                                            rounded-lg p-2
                                            text-slate-400 dark:text-slate-500
                                            transition-colors
                                            hover:bg-white hover:text-slate-700
                                            dark:hover:bg-slate-700 dark:hover:text-slate-200
                                        "
                                    >
                                        <Settings size={16} />
                                    </button>

                                    <button
                                        type="button"
                                        aria-label="Log out"
                                        className="
                                            rounded-lg p-2
                                            text-slate-400 dark:text-slate-500
                                            transition-colors
                                            hover:bg-red-50 hover:text-red-600
                                            dark:hover:bg-red-500/10 dark:hover:text-red-400
                                        "
                                    >
                                        <LogOut size={16} />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </aside>

            {/* Desktop collapse button */}
            <button
                type="button"
                onClick={() => setCollapsed((value) => !value)}
                className="
                    absolute top-8 -right-3.5
                    z-[110]
                    hidden h-7 w-7
                    -translate-y-1/2
                    items-center justify-center
                    rounded-full
                    border border-slate-200 dark:border-slate-700
                    bg-white dark:bg-slate-800
                    shadow-md
                    transition-all duration-200
                    hover:border-teal-400
                    hover:bg-teal-50 dark:hover:bg-teal-500/10
                    hover:shadow-lg
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-teal-500/40
                    md:flex
                "
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                <ChevronLeft
                    size={14}
                    className={`
                        text-slate-500 dark:text-slate-400
                        transition-transform duration-300
                        ${collapsed ? "rotate-180" : ""}
                    `}
                />
            </button>
        </div>
    );
}
