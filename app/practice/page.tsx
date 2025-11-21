import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowRight, CheckSquare } from "lucide-react";

export default async function PracticePage() {
    const chapters = await db.chapter.findMany({
        orderBy: {
            order: "asc",
        },
        include: {
            topics: {
                include: {
                    _count: {
                        select: { questions: true },
                    },
                },
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
                <h1 className="text-3xl font-bold">Practice Questions</h1>
                <p className="text-muted-foreground mt-2">
                    Test your knowledge with chapter-wise practice problems.
                </p>
            </div>

            <div className="space-y-12">
                {categories.map((category) => (
                    <div key={category}>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">{category}</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {groupedChapters[category]?.map((chapter: any) => {
                                const totalQuestions = chapter.topics.reduce(
                                    (acc: number, topic: any) => acc + topic._count.questions,
                                    0
                                );

                                return (
                                    <Link
                                        key={chapter.id}
                                        href={`/practice/${chapter.id}`}
                                        className="group border rounded-lg p-6 hover:shadow-md transition bg-white"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-sm font-medium text-pink-600 bg-pink-50 px-2 py-1 rounded">
                                                Chapter {chapter.order}
                                            </span>
                                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-pink-600 transition" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2 group-hover:text-pink-700 transition">
                                            {chapter.title}
                                        </h3>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <CheckSquare className="h-4 w-4 mr-2" />
                                            {totalQuestions} Questions
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
