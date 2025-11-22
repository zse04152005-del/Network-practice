"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Terminal, Activity, Wifi, Server, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HeroSection() {
    const [terminalLines, setTerminalLines] = useState(["> SYS: ONLINE", "> GEAR: 5TH", "> NET: SECURE"]);
    const [ping, setPing] = useState(24);
    const [isScanning, setIsScanning] = useState(false);
    const [packetCount, setPacketCount] = useState(8080);

    // Simulate ping fluctuation
    useEffect(() => {
        const interval = setInterval(() => {
            setPing(p => Math.max(10, Math.min(50, p + (Math.random() > 0.5 ? 2 : -2))));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleTerminalClick = () => {
        setTerminalLines(["> REBOOTING...", "> ...", "> SYS: OPTIMIZED"]);
        setTimeout(() => setTerminalLines(["> SYS: ONLINE", "> GEAR: 5TH", "> NET: SECURE"]), 2000);
    };

    const handleScanClick = () => {
        setIsScanning(true);
        setTimeout(() => setIsScanning(false), 2000);
    };

    const handlePacketClick = () => {
        setPacketCount(prev => prev + 100);
    };

    return (
        <section className="relative py-20 md:py-32 flex flex-col items-center text-center space-y-8 animate-slide-in w-full">
            {/* Nebula Energy Effect */}
            <div className="nebula-container">
                <div className="energy-stream"></div>
            </div>

            {/* Hero Image Container with Interactive Widgets */}
            <div className="relative w-full max-w-5xl mx-auto flex justify-center items-center h-[500px]">

                {/* Widget 1: Retro Terminal (Top Left) */}
                <div
                    onClick={handleTerminalClick}
                    className="absolute left-0 md:left-4 top-10 hidden md:block animate-float cursor-pointer hover:scale-105 transition-transform z-30"
                    style={{ animationDelay: '0s' }}
                >
                    <div className="bg-retro-ink text-retro-bg p-4 rounded-lg border-2 border-retro-accent shadow-[4px_4px_0px_0px_rgba(212,163,115,1)] w-56 text-left font-mono text-xs">
                        <div className="flex items-center justify-between mb-2 border-b border-retro-bg/20 pb-1">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                            </div>
                            <Terminal className="w-3 h-3 opacity-50" />
                        </div>
                        <div className="space-y-1 opacity-90">
                            {terminalLines.map((line, i) => (
                                <p key={i} className="typing-effect">{line}</p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Widget 2: Protocol Badge (Top Right) */}
                <div
                    className="absolute right-0 md:right-4 top-16 hidden md:block animate-float cursor-pointer hover:scale-105 transition-transform z-30"
                    style={{ animationDelay: '1.5s' }}
                >
                    <div className="bg-retro-bg text-retro-ink p-4 rounded-lg border-2 border-retro-blue shadow-[4px_4px_0px_0px_rgba(44,62,80,1)] w-48 rotate-2 group">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-bold font-serif text-retro-blue">TCP/IP</span>
                            <Activity className="w-4 h-4 text-retro-blue animate-pulse" />
                        </div>
                        <div className="h-2 w-full bg-retro-blue/10 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-retro-blue w-2/3 animate-[shimmer_2s_infinite]"></div>
                        </div>
                        <div className="flex justify-between text-[10px] font-mono opacity-60">
                            <span>Transfer</span>
                            <span>{ping}ms</span>
                        </div>
                    </div>
                </div>

                {/* Widget 3: Port Scanner (Bottom Left) */}
                <div
                    onClick={handleScanClick}
                    className="absolute left-8 md:left-12 bottom-20 hidden md:block animate-float cursor-pointer hover:scale-105 transition-transform z-30"
                    style={{ animationDelay: '2.5s' }}
                >
                    <div className="bg-retro-bg p-3 rounded-full border-2 border-retro-green shadow-[4px_4px_0px_0px_rgba(88,129,87,1)] w-32 h-32 flex flex-col items-center justify-center relative overflow-hidden group">
                        <div className={cn(
                            "absolute inset-0 bg-retro-green/10 rounded-full transition-all duration-1000",
                            isScanning ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        )}></div>
                        <Wifi className="w-8 h-8 text-retro-green mb-1 relative z-10" />
                        <span className="text-xs font-bold text-retro-green font-mono relative z-10">
                            {isScanning ? "SCANNING" : "SCAN NET"}
                        </span>
                        {/* Radar Sweep Line */}
                        <div className="absolute inset-0 border-b-2 border-retro-green/30 animate-[spin_4s_linear_infinite] origin-center"></div>
                    </div>
                </div>

                {/* Widget 4: Server Status (Bottom Right) */}
                <div
                    onClick={handlePacketClick}
                    className="absolute right-6 md:right-10 bottom-24 hidden md:block animate-float cursor-pointer hover:scale-105 transition-transform z-30"
                    style={{ animationDelay: '3.5s' }}
                >
                    <div className="bg-retro-ink text-retro-bg p-3 rounded-lg border-2 border-retro-red shadow-[4px_4px_0px_0px_rgba(201,78,56,1)] w-40 -rotate-2">
                        <div className="flex items-center gap-2 mb-1">
                            <Server className="w-4 h-4 text-retro-red" />
                            <span className="text-xs font-bold text-retro-red">PACKETS</span>
                        </div>
                        <div className="text-2xl font-mono font-bold text-white tracking-widest">
                            {packetCount}
                        </div>
                        <div className="text-[10px] text-retro-bg/60 mt-1">Click to inject</div>
                    </div>
                </div>

                {/* Background Decorative Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dashed border-retro-ink/10 rounded-full animate-[spin_60s_linear_infinite] -z-10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-retro-ink/5 rounded-full -z-10"></div>

                {/* Luffy Gear 5 Image */}
                <div className="relative w-80 h-80 md:w-96 md:h-96 animate-float z-20 hover:scale-105 transition-transform duration-500">
                    <Image
                        src="/luffy-gear5.png"
                        alt="Luffy Gear 5"
                        fill
                        className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                        priority
                    />
                </div>
            </div>

            <div className="relative z-20 -mt-12">
                <div className="inline-block border-b-2 border-retro-red pb-1 mb-4">
                    <span className="font-serif italic text-retro-red text-xl">Est. 2024</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-serif font-bold text-retro-ink leading-tight tracking-tight">
                    Computer <br />
                    <span className="text-retro-blue relative inline-block">
                        Network
                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-retro-yellow opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                        </svg>
                    </span>
                </h1>
            </div>

            <p className="text-xl md:text-2xl text-retro-ink/80 max-w-2xl font-sans leading-relaxed relative z-10">
                Embark on a journey through the layers of the internet. From physical cables to application protocols.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-8 relative z-10">
                <Link href="/learn" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-retro-red font-serif rounded-lg hover:bg-retro-red/90 focus:outline-none ring-offset-2 focus:ring-2 ring-retro-red retro-border">
                    Start Learning
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/practice" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-retro-ink transition-all duration-200 bg-transparent border-2 border-retro-ink font-serif rounded-lg hover:bg-retro-ink hover:text-white focus:outline-none ring-offset-2 focus:ring-2 ring-retro-ink">
                    Practice Now
                </Link>
            </div>
        </section>
    );
}
