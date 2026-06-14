import {
    LayoutDashboard,
    Ticket,
    Bell,
    UserPlus,
    UserKey,
    Compass,
    CarFront,
    Ship,
    Database,
    LogOutIcon,
    UserCircle2Icon,
    TicketPlus,
    Tag,
    ListTodo,
    ListCheck,
} from "lucide-react";

export default function NavIcon({ name }) {
    const icons = {
        dashboard: <LayoutDashboard size={18} />,
        ticket: <Ticket size={18} />,
        bell: <Bell size={18} />,
        userPlus: <UserPlus size={18} />,
        userkey: <UserKey size={18} />,
        compass: <Compass size={18} />,
        carFront: <CarFront size={18} />,
        ship: <Ship size={18} />,
        database: <Database size={18} />,
        logout: <LogOutIcon size={18} />,
        userCircle2Icon: <UserCircle2Icon size={18} />,
        ticketPlus: <TicketPlus size={18} />,
        tag: <Tag size={18} />,
        listTodo: <ListTodo size={18} />,
        listCheck: <ListCheck size={18} />,
    };

    return icons[name] ?? null;
}
