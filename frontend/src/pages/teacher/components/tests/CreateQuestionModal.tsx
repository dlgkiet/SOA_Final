import { useState } from "react";
import { createQuestion } from "@/api/teacher";  // Import createQuestion API
import { useAuthStore } from "@/stores/auth-store";

interface Question {
  content: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
}

interface CreateQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  testId: Number;
  modalTitle?: string; // Title of the modal
}

const CreateQuestionModal = ({ isOpen, onClose, testId, modalTitle }: CreateQuestionModalProps) => {
  const [question, setQuestion] = useState<Question>({
    content: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });

  const { _ui } = useAuthStore();

  const handleSubmit = async () => {
    const newQuestion = {
      testId,  // Add testId
      teacherId: _ui?.userId,
      content: question.content,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      correctAnswer: question.correctAnswer,
    };

    try {
      // Call API to create a single question
      await createQuestion(newQuestion);
      setQuestion({
        content: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
      }); // Clear input fields
    } catch (error) {
      alert("Error creating question");
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">{modalTitle || "Tạo câu hỏi mới"}</h2>

          {/* Manual Input Mode: Input single question */}
          <div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Nội dung câu hỏi"
                value={question.content}
                onChange={(e) => setQuestion({ ...question, content: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Option A"
                value={question.optionA}
                onChange={(e) => setQuestion({ ...question, optionA: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Option B"
                value={question.optionB}
                onChange={(e) => setQuestion({ ...question, optionB: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Option C"
                value={question.optionC}
                onChange={(e) => setQuestion({ ...question, optionC: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Option D"
                value={question.optionD}
                onChange={(e) => setQuestion({ ...question, optionD: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Correct Answer with Radio Buttons */}
            <div className="mb-6">
              <p className="text-gray-700 font-semibold mb-2">Chọn câu trả lời đúng:</p>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="A"
                    checked={question.correctAnswer === "A"}
                    onChange={() => setQuestion({ ...question, correctAnswer: "A" })}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-800">Option A</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="B"
                    checked={question.correctAnswer === "B"}
                    onChange={() => setQuestion({ ...question, correctAnswer: "B" })}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-800">Option B</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="C"
                    checked={question.correctAnswer === "C"}
                    onChange={() => setQuestion({ ...question, correctAnswer: "C" })}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-800">Option C</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="D"
                    checked={question.correctAnswer === "D"}
                    onChange={() => setQuestion({ ...question, correctAnswer: "D" })}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-800">Option D</span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Lưu và tạo câu hỏi mới
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CreateQuestionModal;
