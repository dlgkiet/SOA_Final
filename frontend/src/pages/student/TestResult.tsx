import { useEffect, useState } from "react";
import { processTestData } from "@/api/student";
import { useParams } from "react-router-dom";
import Layout from "@/components/layouts";

const TestResult = () => {
  const [testData, setTestData] = useState<any[]>([]);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { processedData, correctCount, totalQuestions, score } = await processTestData(Number(id));
        setTestData(processedData);
        setCorrectCount(correctCount);
        setTotalQuestions(totalQuestions);
        setScore(score);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p className="text-center text-lg font-semibold text-gray-700">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Lỗi: {error}</p>;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Chi tiết bài làm</h1>

        {/* Điểm & Số câu đúng */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Điểm: <span className="text-blue-600">{score.toFixed(2)}/10</span></h2>
          <h3 className="text-lg text-gray-600">({correctCount} / {totalQuestions} câu đúng)</h3>
        </div>

        {/* Hiển thị câu hỏi và đáp án */}
        {testData.map((question) => (
          <div key={question.id} className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-800">{question.content}</h3>
            <ul className="mt-2">
              {Object.entries(question.options).map(([key, value]) => {
                const isCorrect = key === question.correctAnswer;
                const isSelected = question.studentAnswers.includes(key);

                return (
                  <li
                    key={key}
                    className={`p-2 rounded-md transition-all ${
                      isCorrect ? "bg-green-100 text-green-700 font-semibold" : 
                      isSelected ? "bg-red-100 text-red-700 font-semibold" : "text-gray-700"
                    }`}
                  >
                    {key}. {value} {isCorrect ? "✅" : isSelected ? "❌" : ""}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default TestResult;
