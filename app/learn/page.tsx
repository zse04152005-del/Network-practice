import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

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
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Learning Modules</h1>
                <p className="text-muted-foreground mt-2">
                    Select a chapter to start learning key concepts.
                </p>
            </div>

            <div className="space-y-12">
                {categories.map((category) => (
                    <div key={category}>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">{category}</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {groupedChapters[category]?.map((chapter: any) => (
                                <Link
                                    key={chapter.id}
                                    href={chapter.externalLink || `/learn/${chapter.id}`}
                                    target={chapter.externalLink ? "_blank" : "_self"}
                                    className="group border rounded-lg p-6 hover:shadow-md transition bg-white"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                            Chapter {chapter.order}
                                        </span>
                                        {chapter.externalLink ? (
                                            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition" />
                                        ) : (
                                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition" />
                                        )}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-700 transition">
                                        {chapter.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {chapter._count.topics} Topics
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
