import Link from "next/link";
import { ArrowRight, BookOpen, CheckSquare, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6">
      <h1 className="text-5xl font-bold mb-10 bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">
        Computer Networks
      </h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full">
        <Link
          href="/learn"
          className="group p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition flex flex-col items-center"
        >
          <div className="h-12 w-12 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <BookOpen className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Learn Concepts</h3>
          <p className="text-gray-500 text-sm">
            Chapter-wise summaries and key concepts explained.
          </p>
        </Link>

        <Link
          href="/practice"
          className="group p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition flex flex-col items-center"
        >
          <div className="h-12 w-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <CheckSquare className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Practice Questions</h3>
          <p className="text-gray-500 text-sm">
            Test your understanding with topic-specific questions.
          </p>
        </Link>

        <Link
          href="/exam"
          className="group p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition flex flex-col items-center"
        >
          <div className="h-12 w-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <FileText className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Mock Exam</h3>
          <p className="text-gray-500 text-sm">
            Simulate real exams with timed random questions.
          </p>
        </Link>
      </div>

      <div className="mt-12">
        <Link
          href="/learn"
          className="px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition flex items-center"
        >
          Start Learning Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
