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
                label: "Request Trip Ticket",
                icon: "ticketPlus",
                href: "/request-trip-ticket",
                badge: null,
            },
            {
                label: "My Tickets",
                icon: "tag",
                href: "/my-tickets",
                badge: 5,
            },
        ],
    },
    {
        section: "Processor",
        items: [
            {
                label: "Incoming Queue",
                icon: "listTodo",
                href: "/incoming-queue",
                badge: 5,
            },
            {
                label: "Assign & Review",
                icon: "listCheck",
                href: "/assign-review",
                badge: null,
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
            },
            {
                label: "Logout",
                icon: "logout",
            },
        ],
    },
];
