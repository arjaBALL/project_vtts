import { useForm } from "@inertiajs/react";
import { TextInput, PasswordInput } from "../../components/ui/Inputs";
import { Car, MapPin } from "lucide-react";

function Field({ label, htmlFor, children }) {
    return (
        <div className="mb-5">
            <label
                htmlFor={htmlFor}
                className="mb-2 block text-sm font-medium text-slate-700"
            >
                {label}
            </label>

            {children}
        </div>
    );
}

export default function Login() {
    const { data, post, setData, processing, errors } = useForm({
        username: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f4f8f6] px-4 py-8 sm:px-6">
            <div className="w-full max-w-5xl">
                <div className="grid overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-[0_20px_60px_-20px_rgba(16,185,129,0.15)] md:grid-cols-2">
                    {/* Left Panel */}
                    <div className="relative hidden overflow-hidden bg-emerald-700 p-10 text-white md:flex lg:p-14">
                        {/* Decorative pastel circles */}
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/30" />
                        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-emerald-800/30" />

                        <div className="relative flex w-full flex-col justify-between">
                            {/* Brand */}
                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            className="h-6 w-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 17h14M6 17V7a2 2 0 012-2h8a2 2 0 012 2v10M4 17h16M7 20h.01M17 20h.01M7 13h10"
                                            />
                                        </svg>
                                    </div>

                                    <div>
                                        <h1 className="text-lg font-semibold tracking-tight">
                                            TripTicket
                                        </h1>

                                        <p className="text-xs text-emerald-100">
                                            Trip Ticketing System
                                        </p>
                                    </div>
                                </div>

                                {/* Heading */}
                                <div className="mt-24">
                                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-emerald-200">
                                        Fleet Management
                                    </p>

                                    <h2 className="text-4xl font-semibold leading-tight tracking-tight lg:text-[42px]">
                                        Every trip,
                                        <br />
                                        <span className="text-emerald-100">
                                            organized.
                                        </span>
                                    </h2>

                                    <p className="mt-6 max-w-sm text-sm leading-6 text-emerald-100/90">
                                        Create trip tickets, manage vehicles,
                                        assign drivers, and keep your
                                        transportation operations organized in
                                        one place.
                                    </p>
                                </div>
                            </div>

                            {/* Route Decoration */}
                            <div className="mt-16">
                                <div className="flex items-center">
                                    <Car size={24} />

                                    <div className="relative mx-3 h-px flex-1 bg-emerald-300/40">
                                        <div className="absolute left-1/3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-200" />
                                    </div>

                                    <MapPin size={24} />
                                </div>

                                <div className="mt-3 flex justify-between text-[11px] uppercase tracking-wider text-emerald-200">
                                    <span>Departure</span>
                                    <span>Destination</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="bg-white px-7 py-10 sm:px-12 sm:py-14 lg:px-14">
                        {/* Mobile Brand */}
                        <div className="mb-10 flex items-center gap-3 md:hidden">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-5 w-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 17h14M6 17V7a2 2 0 012-2h8a2 2 0 012 2v10M4 17h16M7 20h.01M17 20h.01M7 13h10"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h1 className="text-base font-semibold text-slate-900">
                                    TripTicket
                                </h1>

                                <p className="text-xs text-slate-400">
                                    Trip Ticketing System
                                </p>
                            </div>
                        </div>

                        <div className="mx-auto max-w-sm">
                            {/* Header */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                                    Welcome back
                                </h2>

                                <p className="mt-2 text-sm leading-5 text-slate-500">
                                    Sign in to access your trip management
                                    dashboard.
                                </p>
                            </div>

                            <form onSubmit={submit}>
                                {/* Username */}
                                <Field
                                    label="Username / Employee ID"
                                    htmlFor="username"
                                >
                                    <TextInput
                                        id="username"
                                        name="username"
                                        value={data.username}
                                        onChange={(e) =>
                                            setData("username", e.target.value)
                                        }
                                        placeholder="Enter your employee ID"
                                        className="h-11 w-full rounded-lg border-slate-200 bg-slate-50/50 transition focus:border-emerald-400 focus:ring-emerald-100"
                                    />

                                    {errors.username && (
                                        <p className="mt-1.5 text-xs text-red-500">
                                            {errors.username}
                                        </p>
                                    )}
                                </Field>

                                {/* Password */}
                                <Field label="Password" htmlFor="password">
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        placeholder="Enter your password"
                                        className="h-11 w-full rounded-lg border-slate-200 bg-slate-50/50 transition focus:border-emerald-400 focus:ring-emerald-100"
                                    />

                                    {errors.password && (
                                        <p className="mt-1.5 text-xs text-red-500">
                                            {errors.password}
                                        </p>
                                    )}
                                </Field>

                                {/* Remember Me */}
                                <div className="mb-6 flex items-center">
                                    <label className="flex cursor-pointer items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                        />

                                        <span className="text-sm text-slate-500">
                                            Remember me
                                        </span>
                                    </label>
                                </div>

                                {/* Login Button */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="h-11 w-full rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm shadow-emerald-600/20 transition-all duration-200 hover:bg-emerald-700 hover:shadow-md hover:shadow-emerald-600/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? "Signing in..." : "Sign in"}
                                </button>
                            </form>

                            {/* Security Note */}
                            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
                                    />
                                </svg>

                                <span>Authorized personnel only</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="mt-5 text-center text-xs text-slate-400">
                    © 2026 TripTicket · Trip Ticketing System
                </p>
            </div>
        </div>
    );
}
