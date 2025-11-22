import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, GraduationCap, Trophy } from "lucide-react";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen p-8 md:p-12 max-w-7xl mx-auto space-y-16 relative overflow-hidden">

      {/* Interactive Hero Section */}
      <HeroSection />

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 relative z-10">
        {[
          {
            title: "Structured Learning",
            desc: "Comprehensive chapters covering the entire TCP/IP stack.",
            icon: BookOpen,
            href: "/learn",
            color: "text-retro-green",
            bg: "bg-retro-green/10"
          },
          {
            title: "Targeted Practice",
            desc: "Hundreds of questions to test your knowledge at every layer.",
            icon: Trophy,
            href: "/practice",
            color: "text-retro-red",
            bg: "bg-retro-red/10"
          },
          {
            title: "Mock Exams",
            desc: "Simulate real exam conditions to build confidence.",
            icon: GraduationCap,
            href: "/exam",
            color: "text-retro-blue",
            bg: "bg-retro-blue/10"
          }
        ].map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="group retro-card p-8 flex flex-col items-start space-y-4 hover:bg-white relative overflow-hidden"
          >
            <div className={`p-4 rounded-full ${item.bg} ${item.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
              <item.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-retro-ink group-hover:text-retro-accent transition-colors">{item.title}</h3>
            <p className="text-retro-ink/70 leading-relaxed">{item.desc}</p>

            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
              <ArrowRight className="w-6 h-6 text-retro-ink/40" />
            </div>
          </Link>
        ))}
      </section>

      {/* Footer / Quote */}
      <section className="py-16 text-center border-t-2 border-retro-ink/10 relative z-10">
        <blockquote className="font-serif text-3xl md:text-4xl italic text-retro-ink/60">
          "The internet is the first thing that humanity has built that humanity doesn't understand, the largest experiment in anarchy that we have ever had."
        </blockquote>
        <cite className="block mt-4 text-retro-ink/40 font-sans not-italic uppercase tracking-widest text-sm">- Eric Schmidt</cite>
      </section>
    </div>
  );
}
