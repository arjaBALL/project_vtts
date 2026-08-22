import { useDarkMode } from "./useDarkMode";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useDarkMode();

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
            {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
    );
}
