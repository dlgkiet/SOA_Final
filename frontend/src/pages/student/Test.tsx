import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuestionsByTestId, submitAnswers } from "@/api/student";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const Test = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        if (!id) return;
        const data = await fetchQuestionsByTestId(Number(id));
        setQuestions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [id]);

  // ✅ Chọn một đáp án duy nhất cho mỗi câu hỏi (radio button)
  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // ✅ Gửi bài kiểm tra đúng format API yêu cầu
  const handleSubmit = async () => {
    if (!id) return;
    const studentId = 123; // 🔹 Thay bằng ID thực tế
    const testId = Number(id);
  
    const answersArray = Object.entries(selectedAnswers)
      .map(([questionId, selectedAnswer]) => ({
        questionId: Number(questionId),
        selectedAnswer: selectedAnswer || "", // ✅ Đảm bảo không có giá trị `undefined`
      }))
      .filter((answer) => answer.selectedAnswer); // ✅ Lọc bỏ câu hỏi chưa chọn
  
    if (answersArray.length === 0) {
      toast.error("Vui lòng chọn ít nhất một đáp án!");
      return;
    }
  
    try {
      await submitAnswers(studentId, testId, answersArray);
      toast.success("Nộp bài thành công!");
    } catch (error: any) {
      toast.error("Nộp bài thất bại: " + error.message);
    }
  };
  

  if (loading) return <Skeleton className="h-8 w-full" />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Bài kiểm tra</h1>

      {questions.length > 0 ? (
        <ul className="space-y-4">
          {questions.map((q: any, index: number) => (
            <li key={q.id} className="p-4 bg-white shadow-md rounded-lg border">
              <h2 className="text-lg font-semibold">Câu {index + 1}: {q.content}</h2>
              <div className="mt-2 space-y-2">
                {["A", "B", "C", "D"].map((option) => (
                  <label key={option} className="block">
                    <input
                      type="radio"
                      name={`question-${q.id}`} // ✅ Chỉ cho phép chọn một đáp án
                      value={option}
                      className="mr-2"
                      checked={selectedAnswers[q.id] === option}
                      onChange={() => handleAnswerSelect(q.id, option)}
                    />
                    {q[`option${option}`]}
                  </label>
                ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Chưa có câu hỏi nào cho bài kiểm tra này.</p>
      )}

      {/* Nút Nộp Bài */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition w-full"
        >
          Nộp bài kiểm tra
        </button>
      </div>
    </div>
  );
};

export default Test;
