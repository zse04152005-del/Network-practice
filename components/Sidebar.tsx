import Link from "next/link";
import { BookOpen, CheckSquare, FileText, Home, LayoutDashboard } from "lucide-react";

const routes = [
    {
        label: "Home",
        icon: Home,
        href: "/",
        color: "text-sky-500",
    },
    {
        label: "Learn",
        icon: BookOpen,
        href: "/learn",
        color: "text-violet-500",
    },
    {
        label: "Practice",
        icon: CheckSquare,
        href: "/practice",
        color: "text-pink-700",
    },
    {
        label: "Mock Exam",
        icon: FileText,
        href: "/exam",
        color: "text-orange-700",
    },
];

export const Sidebar = () => {
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/" className="flex items-center pl-3 mb-14">
                    <h1 className="text-2xl font-bold">
                        Net<span className="text-blue-500">Prep</span>
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition"
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={`h-5 w-5 mr-3 ${route.color}`} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
