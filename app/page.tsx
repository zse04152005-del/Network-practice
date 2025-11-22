import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen p-8 md:p-12 max-w-7xl mx-auto space-y-16 relative overflow-hidden">
      {/* Meteor Shower Background */}
      <div className="meteor-shower">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="meteor"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              width: `${Math.random() * 100 + 50}px`
            }}
          ></div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 flex flex-col items-center text-center space-y-8 animate-slide-in">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-retro-yellow rounded-full blur-[100px] opacity-20 -z-10 animate-float"></div>

        <div className="inline-block border-b-2 border-retro-red pb-1 mb-4">
          <span className="font-serif italic text-retro-red text-xl">Est. 2024</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-serif font-bold text-retro-ink leading-tight tracking-tight relative z-10">
          Master the <br />
          <span className="text-retro-blue relative inline-block">
            Network
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-retro-yellow opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span>
        </h1>

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
