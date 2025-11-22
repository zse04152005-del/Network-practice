import { db } from "@/lib/db";
import QuizClient from "@/components/QuizClient";
import Image from "next/image";
import { GraduationCap } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ExamPage() {
    const allQuestions = await db.question.findMany({
        take: 50, // Limit to 50 random questions for the exam
        orderBy: {
            id: 'asc', // Ideally this would be random, but for now simple order
        }
    });

    // Shuffle questions in memory for now
    const questions = allQuestions.sort(() => Math.random() - 0.5);

    return (
        <div className="p-8 md:p-12 max-w-7xl mx-auto">
            <div className="mb-12 text-center relative">
                <div className="inline-block p-3 rounded-full bg-retro-blue/10 mb-4">
                    <GraduationCap className="w-8 h-8 text-retro-blue" />
                </div>
                <div className="relative inline-block">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-retro-ink mb-4">Mock Exam</h1>
                    {/* Kid Ace Decoration (Using Devil Fruit as placeholder for now) */}
                    <div className="absolute -right-24 -top-8 w-24 h-24 hidden md:block animate-float" style={{ animationDelay: '1.2s' }}>
                        <Image
                            src="/devil-fruit.png"
                            alt="Kid Ace"
                            fill
                            className="object-contain rotate-6 drop-shadow-md"
                        />
                    </div>
                </div>
                <p className="text-xl text-retro-ink/60 font-serif italic">
                    "Test your limits and go beyond."
                </p>
            </div>
            {/* Assuming QuizClient is still needed, but the instruction snippet removed it.
                If it's meant to be removed, delete the following block.
                If it's meant to be kept, adjust props as needed.
            */}
            <QuizClient questions={questions as any} mode="exam" />
        </div>
    );
}
