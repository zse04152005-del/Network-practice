import { db } from "@/lib/db";
import QuizClient from "@/components/QuizClient";

export const dynamic = "force-dynamic";

export default async function ExamPage() {
    // Fetch random questions (e.g., 20)
    // Prisma doesn't support random natively efficiently, but for small dataset we can fetch all and shuffle
    const allQuestions = await db.question.findMany({
        take: 100, // Limit to 100 pool
    });

    // Shuffle and take 20
    const questions = allQuestions
        .sort(() => 0.5 - Math.random())
        .slice(0, 20);

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Mock Exam</h1>
                <p className="text-muted-foreground mt-2">
                    Simulate a real exam environment. Immediate feedback is disabled.
                </p>
            </div>

            <QuizClient questions={allQuestions as any} mode="exam" />
        </div>
    );
}
