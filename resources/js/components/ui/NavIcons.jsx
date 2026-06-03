import {
    LayoutDashboard,
    Ticket,
    Bell,
    UserPlus,
    UserKey,
    Compass,
    CarFront,
    Ship,
} from "lucide-react";

export default function NavIcon({ name }) {
    const icons = {
        dashboard: <LayoutDashboard size={20} />,
        ticket: <Ticket size={20} />,
        bell: <Bell size={20} />,
        userPlus: <UserPlus size={20} />,
        userkey: <UserKey size={20} />,
        compass: <Compass size={20} />,
        carFront: <CarFront size={20} />,
        ship: <Ship size={20} />,
    };

    return icons[name] ?? null;
}
