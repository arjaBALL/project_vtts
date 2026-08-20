import { Menu } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";
import { Sun, Moon } from "lucide-react";

export default function NavBar({ onMenuClick }) {
    const [isDark, setIsDark] = useDarkMode();

    return (
        <header className="flex items-center h-13 px-4 bg-white dark:bg-gray-900 gap-3 z-40 relative transition-colors">
            {/* Hamburger — mobile only */}
            <button
                onClick={onMenuClick}
                className="md:hidden p-2 rounded-md text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Open menu"
            >
                <Menu size={20} />
            </button>

            {/* ...rest of your navbar... */}

            {/* Dark mode toggle */}
            <button
                onClick={() => setIsDark(!isDark)}
                className="ml-auto p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </header>
    );
}
