import { Menu } from "lucide-react";

export default function NavBar({ onMenuClick }) {
    return (
        <header className="flex items-center h-13 px-4   bg-gray-800 gap-3 z-40 relative">
            {/* Hamburger — mobile only */}
            <button
                onClick={onMenuClick}
                className="md:hidden p-2 rounded-md text-blue-700 hover:bg-blue-100 transition-colors"
                aria-label="Open menu"
            >
                <Menu size={20} />
            </button>

            {/* ...rest of your navbar... */}
        </header>
    );
}
