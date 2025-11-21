"use client";

import { useState } from "react";
import { ChevronLeft, CheckCircle, XCircle, RefreshCcw, ArrowRight, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Question {
    id: string;
    content: string;
    type: string;
    options: string | null;
    correctAnswer: string;
    explanation: string | null;
    difficulty: string;
}

interface QuizClientProps {
    chapterTitle: string;
    questions: Question[];
    mode?: "practice" | "exam";
}

export const QuizClient = ({ chapterTitle, questions, mode = "practice" }: QuizClientProps) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    // For exam mode, we need to store all answers
    const [examAnswers, setExamAnswers] = useState<Record<string, string>>({});

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    const [showNavigator, setShowNavigator] = useState(false);

    const handleJumpToQuestion = (index: number) => {
        setCurrentQuestionIndex(index);
        setSelectedAnswer(null);
        setIsSubmitted(false);
        setShowExplanation(false);
        setShowNavigator(false);
    };

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleOptionSelect = (option: string) => {
        if (isSubmitted && mode === "practice") return;
        setSelectedAnswer(option);
    };

    const handleSubmit = () => {
        if (!selectedAnswer) return;

        if (mode === "practice") {
            const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
            if (isCorrect) {
                setScore(score + 1);
            }
            setIsSubmitted(true);
        } else {
            // Exam mode: just save answer and go next
            setExamAnswers({ ...examAnswers, [currentQuestion.id]: selectedAnswer });
            handleNext();
        }
    };

    const finishExam = () => {
        let finalScore = score;
        if (mode === "exam") {
            // Calculate score based on stored answers
            // Note: The last question's answer is in selectedAnswer if we clicked "Finish"
            const allAnswers = { ...examAnswers };
            if (selectedAnswer && currentQuestion) {
                allAnswers[currentQuestion.id] = selectedAnswer;
            }

            finalScore = questions.reduce((acc, q) => {
                return acc + (allAnswers[q.id] === q.correctAnswer ? 1 : 0);
            }, 0);
            setScore(finalScore);
        }
        setShowResult(true);
    };

    const handleNext = () => {
        if (isLastQuestion) {
            finishExam();
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setIsSubmitted(false);
            setShowExplanation(false);
            setShowNavigator(false);
        }
    };

    const handleRetry = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsSubmitted(false);
        setScore(0);
        setShowResult(false);
        setShowExplanation(false);
        setShowNavigator(false);
        setExamAnswers({}); // Reset exam answers for retry
    };

    if (questions.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-700">No questions available yet.</h2>
                <Link href="/practice" className="text-blue-600 hover:underline mt-4 block">
                    Back to Practice
                </Link>
            </div>
        );
    }

    if (showResult) {
        return (
            <div className="max-w-2xl mx-auto text-center py-10">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
                    <div className="text-6xl font-bold text-blue-600 mb-4">
                        {Math.round((score / questions.length) * 100)}%
                    </div>
                    <p className="text-xl text-gray-600 mb-8">
                        You scored {score} out of {questions.length}
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            href="/practice"
                            className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 font-medium"
                        >
                            Back to List
                        </Link>
                        <button
                            onClick={handleRetry}
                            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium flex items-center"
                        >
                            <RefreshCcw className="w-4 h-4 mr-2" />
                            Retry Quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const options = currentQuestion.options ? JSON.parse(currentQuestion.options) : [];

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <Link
                    href="/practice"
                    className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Practice
                </Link>
                <div className="flex justify-between items-center relative">
                    <h1 className="text-2xl font-bold">{chapterTitle}</h1>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
                            Question {currentQuestionIndex + 1} / {questions.length}
                        </span>
                        <button
                            onClick={() => setShowNavigator(!showNavigator)}
                            className="p-2 hover:bg-gray-100 rounded-full transition"
                            title="Jump to question"
                        >
                            <LayoutGrid className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    {showNavigator && (
                        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border p-4 z-10 grid grid-cols-5 gap-2">
                            {questions.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleJumpToQuestion(idx)}
                                    className={cn(
                                        "w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition",
                                        currentQuestionIndex === idx
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    )}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{currentQuestion.content}</h2>

                <div className="space-y-3 mb-8">
                    {currentQuestion.type === "MCQ" || currentQuestion.type === "TF" ? (
                        options.map((option: string, index: number) => {
                            const isSelected = selectedAnswer === option;
                            const isCorrect = option === currentQuestion.correctAnswer;
                            const label = String.fromCharCode(65 + index); // A, B, C, D...

                            let buttonStyle = "border-gray-200 hover:border-blue-500 hover:bg-blue-50";
                            if (isSubmitted && mode === "practice") {
                                if (isCorrect) {
                                    buttonStyle = "border-green-500 bg-green-50 text-green-700";
                                } else if (isSelected && !isCorrect) {
                                    buttonStyle = "border-red-500 bg-red-50 text-red-700";
                                } else {
                                    buttonStyle = "border-gray-200 opacity-50";
                                }
                            } else if (isSelected) {
                                buttonStyle = "border-blue-500 bg-blue-50 ring-1 ring-blue-500";
                            }

                            return (
                                <button
                                    key={option}
                                    onClick={() => handleOptionSelect(option)}
                                    disabled={isSubmitted && mode === "practice"}
                                    className={cn(
                                        "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center",
                                        buttonStyle
                                    )}
                                >
                                    <span className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center mr-4 font-bold text-gray-600 shrink-0">
                                        {label}
                                    </span>
                                    <span className="flex-1">{option}</span>
                                    {isSubmitted && mode === "practice" && isCorrect && <CheckCircle className="w-5 h-5 text-green-600 ml-2" />}
                                    {isSubmitted && mode === "practice" && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600 ml-2" />}
                                </button>
                            );
                        })
                    ) : (
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <input
                                type="text"
                                placeholder="Type your answer here..."
                                className="w-full bg-transparent outline-none"
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
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center focus:outline-none"
                    >
                        {showExplanation ? "Hide Explanation" : "Show Explanation"}
                    </button>

                    {showExplanation && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100 animate-in fade-in slide-in-from-top-2">
                            <h4 className="font-semibold text-blue-900 mb-1">Explanation</h4>
                            <p className="text-blue-800 text-sm">{currentQuestion.explanation}</p>
                            <p className="text-blue-800 text-sm mt-2 font-bold">Correct Answer: {currentQuestion.correctAnswer}</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-end">
                    {mode === "practice" ? (
                        !isSubmitted ? (
                            <button
                                onClick={handleSubmit}
                                disabled={!selectedAnswer}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                Submit Answer
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition flex items-center"
                            >
                                {isLastQuestion ? "Finish Quiz" : "Next Question"}
                                <ArrowRight className="w-4 h-4 ml-2" />
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
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center"
                        >
                            {isLastQuestion ? "Finish Exam" : "Next Question"}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

