export const navItems = [
    {
        section: "Main",
        items: [
            {
                label: "Dashboard",
                icon: "dashboard",
                href: "/dashboard",
                badge: null,
            },
            {
                label: "My Trip Tickets",
                icon: "ticket",
                href: "/request-trip-ticket",
                badge: null,
            },
        ],
    },
    {
        section: "Trip Processing",
        items: [
            {
                label: "Review & Assign",
                icon: "clipboardCheck",
                href: "/assign-review",
                badge: null,
            },
            {
                label: "Assigned Trips",
                icon: "route",
                href: "/incoming-queue",
                badge: 5,
            },
        ],
    },
    {
        section: "Administrator",
        items: [
            {
                label: "Data Management",
                icon: "database",
                children: [
                    {
                        label: "Drivers",
                        icon: "userkey",
                        href: "/drivers",
                    },
                    {
                        label: "Users",
                        icon: "userPlus",
                        href: "/users",
                    },
                    {
                        label: "Vehicles",
                        icon: "carFront",
                        href: "/vehicles",
                    },
                ],
            },
        ],
    },
    {
        section: "Account",
        items: [
            {
                label: "Profile",
                icon: "userCircle2Icon",
                href: "/profile",
            },
        ],
    },
];
