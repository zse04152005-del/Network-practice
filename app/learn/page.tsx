import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowRight, ExternalLink, Book } from "lucide-react";

export default async function LearnPage() {
    const chapters = await db.chapter.findMany({
        orderBy: {
            order: "asc",
        },
        include: {
            _count: {
                select: { topics: true },
            },
        },
    });

    const categories = ["计网 I", "计网 II", "专题"];
    const groupedChapters = categories.reduce((acc, category) => {
        acc[category] = chapters.filter((c: any) => c.category === category);
        return acc;
    }, {} as Record<string, typeof chapters>);

    return (
        <div className="p-8 md:p-12 max-w-7xl mx-auto">
            <div className="mb-12 text-center">
                <div className="inline-block p-3 rounded-full bg-retro-green/10 mb-4">
                    <Book className="w-8 h-8 text-retro-green" />
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-retro-ink mb-4">Learning Modules</h1>
                <p className="text-xl text-retro-ink/60 font-serif italic">
                    "Knowledge is the routing table of life."
                </p>
            </div>

            <div className="space-y-16">
                {categories.map((category) => (
                    <div key={category} className="relative">
                        <div className="flex items-center mb-8">
                            <div className="h-px bg-retro-ink/20 flex-1"></div>
                            <h2 className="text-2xl font-serif font-bold text-retro-ink px-4 border-2 border-retro-ink/20 py-2 rounded-lg bg-retro-bg mx-4">
                                {category}
                            </h2>
                            <div className="h-px bg-retro-ink/20 flex-1"></div>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {groupedChapters[category]?.map((chapter: any) => (
                                <Link
                                    key={chapter.id}
                                    href={chapter.externalLink || `/learn/${chapter.id}`}
                                    target={chapter.externalLink ? "_blank" : "_self"}
                                    className="group retro-card p-6 flex flex-col h-full relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-retro-yellow/10 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-500"></div>

                                    <div className="flex items-center justify-between mb-6 relative z-10">
                                        <span className="inline-flex items-center justify-center h-8 px-3 text-xs font-bold tracking-widest text-retro-bg bg-retro-ink rounded-full font-sans">
                                            CH {chapter.order}
                                        </span>
                                        {chapter.externalLink ? (
                                            <ExternalLink className="h-5 w-5 text-retro-ink/40 group-hover:text-retro-blue transition-colors" />
                                        ) : (
                                            <ArrowRight className="h-5 w-5 text-retro-ink/40 group-hover:text-retro-blue transition-colors group-hover:translate-x-1 duration-300" />
                                        )}
                                    </div>

                                    <h3 className="text-xl font-serif font-bold text-retro-ink mb-3 group-hover:text-retro-blue transition-colors leading-tight">
                                        {chapter.title}
                                    </h3>

                                    <div className="mt-auto pt-4 border-t border-retro-ink/10 flex items-center text-sm text-retro-ink/60 font-medium">
                                        <Book className="w-4 h-4 mr-2" />
                                        {chapter._count.topics} Topics
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
