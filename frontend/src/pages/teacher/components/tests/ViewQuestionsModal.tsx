import { useState, useEffect } from 'react';
import { fetchQuestions } from '@/api/teacher'; // Đảm bảo rằng API này đã được import

interface Question {
  id: number;
  content: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
}

interface ViewQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  testId: number;
}

const ViewQuestionsModal = ({ isOpen, onClose, testId }: ViewQuestionsModalProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (isOpen && testId) {
      fetchQuestions(testId).then((data) => setQuestions(data)).catch((error) => console.error(error));
    }
  }, [isOpen, testId]);

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Danh sách câu hỏi</h2>
          {questions.length > 0 ? (
            <div>
              <ul>
                {questions.map((question) => (
                  <li key={question.id} className="mb-4 p-4 border-b">
                    <p className="font-medium">{question.content}</p>
                    <div className="mt-2">
                      <p>A: {question.optionA}</p>
                      <p>B: {question.optionB}</p>
                      <p>C: {question.optionC}</p>
                      <p>D: {question.optionD}</p>
                      <p className="font-semibold mt-2">Đáp án đúng: {question.correctAnswer}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500">Chưa có câu hỏi nào.</p>
          )}

          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ViewQuestionsModal;
