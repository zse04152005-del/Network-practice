import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import QuizClient from "@/components/QuizClient";

interface PracticeChapterPageProps {
    params: Promise<{
        chapterId: string;
    }>;
}

export default async function PracticeChapterPage({
    params,
}: PracticeChapterPageProps) {
    const { chapterId } = await params;
    const chapter = await db.chapter.findUnique({
        where: {
            id: chapterId,
        },
        include: {
            topics: {
                include: {
                    questions: true,
                },
            },
        },
    });

    if (!chapter) {
        return redirect("/practice");
    }

    // Flatten questions from all topics in the chapter
    const questions = chapter.topics.flatMap((topic: any) => topic.questions);

    return (
        <div className="p-6">
            return <QuizClient questions={questions as any} mode="practice" />;
        </div>
    );
}
