"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, XCircle, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
    id: string;
    content: string;
    type: "MCQ" | "TF" | "FIB";
    options: string | null;
    correctAnswer: string;
    explanation: string;
    difficulty: string;
}

interface QuizClientProps {
    questions: Question[];
    mode: "practice" | "exam";
}

export default function QuizClient({ questions, mode }: QuizClientProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [examAnswers, setExamAnswers] = useState<Record<string, string>>({});
    const [isExamFinished, setIsExamFinished] = useState(false);
    const [showNavigator, setShowNavigator] = useState(false);

    // Reset state when question changes
    useEffect(() => {
        setSelectedAnswer(null);
        setIsSubmitted(false);
        setShowExplanation(false);
    }, [currentQuestionIndex]);

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    // Parse options safely
    let options: string[] = [];
    if (currentQuestion.options) {
        try {
            options = JSON.parse(currentQuestion.options);
        } catch (e) {
            console.error("Failed to parse options", e);
            options = [];
        }
    }

    const handleOptionSelect = (option: string) => {
        if (!isSubmitted) {
            setSelectedAnswer(option);
        }
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }
        setShowExplanation(true);
    };

    const handleNext = () => {
        if (isLastQuestion) {
            // In practice mode, maybe show a summary?
            alert(`Practice completed! You got ${score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0)} correct.`);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const finishExam = () => {
        // Calculate score
        let finalScore = 0;
        questions.forEach(q => {
            if (examAnswers[q.id] === q.correctAnswer) {
                finalScore++;
            }
        });
        setIsExamFinished(true);
        setScore(finalScore);
    };

    const handleJumpToQuestion = (index: number) => {
        setCurrentQuestionIndex(index);
        setShowNavigator(false);
    };

    if (isExamFinished) {
        return (
            <div className="text-center py-20 animate-slide-in">
                <div className="inline-block p-6 rounded-full bg-retro-yellow/20 mb-6">
                    <Trophy className="w-16 h-16 text-retro-yellow" />
                </div>
                <h2 className="text-4xl font-serif font-bold text-retro-ink mb-4">Exam Completed!</h2>
                <p className="text-xl text-retro-ink/70 mb-8">
                    You scored <span className="font-bold text-retro-red text-3xl">{score}</span> out of <span className="font-bold text-retro-ink text-3xl">{questions.length}</span>
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-retro-ink text-white font-serif font-bold rounded-lg hover:bg-retro-ink/90 transition-all shadow-[4px_4px_0px_0px_rgba(201,78,56,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(201,78,56,1)]"
                >
                    Retake Exam
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            {/* Progress Bar / Header */}
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <span className="font-serif text-2xl font-bold text-retro-ink">Question {currentQuestionIndex + 1}</span>
                    <span className="text-retro-ink/40 font-serif text-lg">of {questions.length}</span>
                </div>
                <div className="h-4 w-48 bg-retro-ink/10 rounded-full overflow-hidden border border-retro-ink/20">
                    <div
                        className="h-full bg-retro-yellow transition-all duration-500 ease-out"
                        style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <div className="retro-card p-8 md:p-12 relative overflow-hidden group">
                {/* Decorative corner stamp */}
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Trophy className="w-24 h-24 rotate-12" />
                </div>

                <div className="mb-8">
                    <span className={cn(
                        "inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase border-2 mb-4",
                        currentQuestion.difficulty === "EASY" ? "border-retro-green text-retro-green" :
                            currentQuestion.difficulty === "MEDIUM" ? "border-retro-yellow text-retro-yellow" :
                                "border-retro-red text-retro-red"
                    )}>
                        {currentQuestion.difficulty}
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-retro-ink leading-tight">{currentQuestion.content}</h2>
                </div>

                <div className="space-y-4 mb-8">
                    {currentQuestion.type === "MCQ" || currentQuestion.type === "TF" ? (
                        options.map((option: string, index: number) => {
                            const isSelected = selectedAnswer === option;
                            const isCorrect = option === currentQuestion.correctAnswer;
                            const label = String.fromCharCode(65 + index); // A, B, C, D...

                            let buttonStyle = "border-retro-ink/20 hover:border-retro-ink hover:bg-retro-bg";
                            if (isSubmitted && mode === "practice") {
                                if (isCorrect) {
                                    buttonStyle = "border-retro-green bg-retro-green/10 text-retro-green ring-2 ring-retro-green ring-offset-2";
                                } else if (isSelected && !isCorrect) {
                                    buttonStyle = "border-retro-red bg-retro-red/10 text-retro-red opacity-80";
                                } else {
                                    buttonStyle = "border-retro-ink/10 opacity-40";
                                }
                            } else if (isSelected) {
                                buttonStyle = "border-retro-blue bg-retro-blue text-white shadow-[4px_4px_0px_0px_rgba(44,62,80,1)] translate-x-[-2px] translate-y-[-2px]";
                            }

                            return (
                                <button
                                    key={option}
                                    onClick={() => handleOptionSelect(option)}
                                    disabled={isSubmitted && mode === "practice"}
                                    className={cn(
                                        "w-full text-left p-5 rounded-lg border-2 transition-all duration-200 flex items-center group/btn relative overflow-hidden",
                                        buttonStyle
                                    )}
                                >
                                    <span className={cn(
                                        "w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 font-bold font-serif shrink-0 transition-colors",
                                        isSelected ? "bg-white text-retro-blue border-white" : "bg-transparent border-retro-ink/30 text-retro-ink/60 group-hover/btn:border-retro-ink group-hover/btn:text-retro-ink"
                                    )}>
                                        {label}
                                    </span>
                                    <span className="flex-1 font-medium text-lg">{option}</span>
                                    {isSubmitted && mode === "practice" && isCorrect && <CheckCircle className="w-6 h-6 text-retro-green ml-2" />}
                                    {isSubmitted && mode === "practice" && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-retro-red ml-2" />}
                                </button>
                            );
                        })
                    ) : (
                        <div className="p-6 bg-retro-bg rounded-lg border-2 border-retro-ink/20 focus-within:border-retro-blue focus-within:ring-1 focus-within:ring-retro-blue transition-all">
                            <input
                                type="text"
                                placeholder="Type your answer here..."
                                className="w-full bg-transparent outline-none font-serif text-xl text-retro-ink placeholder:text-retro-ink/30"
                                value={selectedAnswer || ""}
                                onChange={(e) => !isSubmitted && setSelectedAnswer(e.target.value)}
                                disabled={isSubmitted && mode === "practice"}
                            />
                        </div>
                    )}
                </div>

                <div className="mb-6">
                    <button
                        onClick={() => setShowExplanation(!showExplanation)}
                        className="text-retro-blue hover:text-retro-ink font-serif italic text-sm flex items-center focus:outline-none group"
                    >
                        <span className="border-b border-transparent group-hover:border-retro-ink transition-all">
                            {showExplanation ? "Hide Explanation" : "Show Explanation"}
                        </span>
                    </button>

                    {showExplanation && (
                        <div className="mt-6 p-6 bg-retro-yellow/10 border-l-4 border-retro-yellow animate-slide-in">
                            <h4 className="font-serif font-bold text-retro-ink mb-2 text-lg">Explanation</h4>
                            <p className="text-retro-ink/80 leading-relaxed">{currentQuestion.explanation}</p>
                            <p className="text-retro-ink font-bold mt-4 font-serif">Correct Answer: {currentQuestion.correctAnswer}</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-end pt-6 border-t-2 border-retro-ink/5">
                    {mode === "practice" ? (
                        !isSubmitted ? (
                            <button
                                onClick={handleSubmit}
                                disabled={!selectedAnswer}
                                className="px-8 py-3 bg-retro-ink text-white font-serif font-bold rounded-lg hover:bg-retro-ink/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[4px_4px_0px_0px_rgba(201,78,56,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(201,78,56,1)] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(201,78,56,1)]"
                            >
                                Submit Answer
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="px-8 py-3 bg-retro-red text-white font-serif font-bold rounded-lg hover:bg-retro-red/90 transition-all flex items-center shadow-[4px_4px_0px_0px_rgba(45,42,38,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(45,42,38,1)]"
                            >
                                {isLastQuestion ? "Finish Quiz" : "Next Question"}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </button>
                        )
                    ) : (
                        <button
                            onClick={() => {
                                if (isLastQuestion) {
                                    finishExam();
                                } else {
                                    setExamAnswers({ ...examAnswers, [currentQuestion.id]: selectedAnswer! });
                                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                                    setSelectedAnswer(null);
                                }
                            }}
                            disabled={!selectedAnswer}
                            className="px-8 py-3 bg-retro-blue text-white font-serif font-bold rounded-lg hover:bg-retro-blue/90 transition-all flex items-center shadow-[4px_4px_0px_0px_rgba(45,42,38,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(45,42,38,1)]"
                        >
                            {isLastQuestion ? "Finish Exam" : "Next Question"}
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
