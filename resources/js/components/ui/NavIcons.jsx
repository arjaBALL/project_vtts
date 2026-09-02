import {
    LayoutDashboard,
    Ticket,
    ClipboardCheck,
    Route,
    Database,
    UserKey,
    UserPlus,
    CarFront,
    CircleUserRound,
    LogOut,
    ShieldCheck,
} from "lucide-react";

export default function NavIcon({ name, size = 18, strokeWidth = 1.8 }) {
    const icons = {
        dashboard: LayoutDashboard,
        ticket: Ticket,
        clipboardCheck: ClipboardCheck,
        route: Route,
        database: Database,
        userkey: UserKey,
        userPlus: UserPlus,
        carFront: CarFront,
        userCircle2Icon: CircleUserRound,
        logout: LogOut,
        permissions: ShieldCheck,
    };

    const Icon = icons[name];

    return Icon ? <Icon size={size} strokeWidth={strokeWidth} /> : null;
}
