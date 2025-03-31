import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuestionsByTestId } from "@/api/student"; // Đảm bảo đường dẫn chính xác
import { Skeleton } from "@/components/ui/skeleton";

const Test = () => {
  const { id } = useParams(); // Lấy testId từ URL
  const [questions, setQuestions] = useState([]);
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
                <label className="block">
                  <input type="radio" name={`question-${q.id}`} value="A" className="mr-2" />
                  {q.optionA}
                </label>
                <label className="block">
                  <input type="radio" name={`question-${q.id}`} value="B" className="mr-2" />
                  {q.optionB}
                </label>
                <label className="block">
                  <input type="radio" name={`question-${q.id}`} value="C" className="mr-2" />
                  {q.optionC}
                </label>
                <label className="block">
                  <input type="radio" name={`question-${q.id}`} value="D" className="mr-2" />
                  {q.optionD}
                </label>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Chưa có câu hỏi nào cho bài kiểm tra này.</p>
      )}
    </div>
  );
};

export default Test;
