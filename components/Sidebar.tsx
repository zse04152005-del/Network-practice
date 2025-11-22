"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BookOpen, GraduationCap, LayoutDashboard, Trophy } from "lucide-react";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/",
        color: "text-retro-blue",
    },
    {
        label: "Learn",
        icon: BookOpen,
        href: "/learn",
        color: "text-retro-green",
    },
    {
        label: "Practice",
        icon: Trophy,
        href: "/practice",
        color: "text-retro-red",
    },
    {
        label: "Exam",
        icon: GraduationCap,
        href: "/exam",
        color: "text-retro-yellow",
    },
];

export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-retro-ink text-retro-bg border-r-4 border-retro-accent relative overflow-hidden">
            {/* Decorative Grain Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

            <div className="px-6 py-4 z-10">
                <Link href="/" className="flex items-center pl-2 mb-8 group">
                    <div className="relative mr-4">
                        <div className="absolute -inset-1 bg-retro-yellow rounded-full blur opacity-20 group-hover:opacity-75 transition duration-500"></div>
                        <div className="h-10 w-10 rounded-full bg-retro-bg flex items-center justify-center border-2 border-retro-yellow relative">
                            <span className="text-xl font-serif font-bold text-retro-ink">R</span>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold font-serif tracking-wider text-retro-bg group-hover:text-retro-yellow transition-colors">
                        Radiant
                    </h1>
                </Link>

                <div className="space-y-2">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-300 border border-transparent hover:border-white/20 hover:translate-x-1",
                                pathname === route.href ? "bg-white/10 border-white/20 text-retro-yellow" : "text-zinc-400"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3 transition-colors duration-300", route.color, pathname === route.href && "text-retro-yellow")} />
                                <span className={cn("font-serif text-lg tracking-wide", pathname === route.href ? "text-retro-bg" : "")}>{route.label}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mt-auto px-6 py-4 z-10">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h3 className="font-serif text-retro-yellow mb-1">Daily Wisdom</h3>
                    <p className="text-xs text-zinc-400 italic">"The network is the computer."</p>
                </div>
            </div>
        </div>
    );
};
