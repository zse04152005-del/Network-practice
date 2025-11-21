import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface ChapterIdPageProps {
    params: Promise<{
        chapterId: string;
    }>;
}

export default async function ChapterIdPage({
    params,
}: ChapterIdPageProps) {
    const { chapterId } = await params;
    const chapter = await db.chapter.findUnique({
        where: {
            id: chapterId,
        },
        include: {
            topics: {
                orderBy: {
                    title: "asc", // Ideally should have an order field, but title works for now
                },
            },
        },
    });

    if (!chapter) {
        return redirect("/learn");
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-6">
                <Link
                    href="/learn"
                    className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Chapters
                </Link>
                <h1 className="text-3xl font-bold">{chapter.title}</h1>
            </div>

            <div className="space-y-8">
                {chapter.topics.map((topic: any) => (
                    <div key={topic.id} className="border rounded-lg p-6 bg-white shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                            {topic.title}
                        </h2>
                        <div className="prose max-w-none text-gray-600 whitespace-pre-line">
                            {topic.summary}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
