import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";

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
  onSubmit: (questions: Question[] | any) => void; // Accepts an array of questions or JSON data
  testId: Number
}

const CreateQuestionModal = ({ isOpen, onClose, onSubmit, testId }: CreateQuestionModalProps) => {
  const [isJsonMode, setIsJsonMode] = useState(false); // Toggle between JSON mode and manual input
  const [question, setQuestion] = useState<Question>({
    content: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });

  const { _ui } = useAuthStore();

  const teacherId = _ui?.userId;

  console.log("TeacherId", teacherId);
  console.log("TestId", testId);

  const [jsonInput, setJsonInput] = useState(""); // JSON input for multiple questions

  const handleSubmit = () => {
    if (isJsonMode) {
      try {
        const parsedQuestions = JSON.parse(jsonInput);
        if (Array.isArray(parsedQuestions)) {
          onSubmit(parsedQuestions); // Submit array of questions in JSON format
          setJsonInput(""); // Clear the JSON input field
          onClose(); // Close modal
        }
      } catch (error) {
        alert("Invalid JSON format");
      }
    } else {
      onSubmit([question]); // Submit a single question
      // Clear fields for new input and keep the modal open
      setQuestion({
        content: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
      }); // Clear input fields to continue entering new question
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Tạo câu hỏi mới</h2>

          {/* Toggle between modes */}
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setIsJsonMode(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Nhập câu hỏi
            </button>
            <button
              onClick={() => setIsJsonMode(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Nhập JSON
            </button>
          </div>

          {/* JSON Mode: Input multiple questions as JSON */}
          {isJsonMode ? (
            <div>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Nhập JSON các câu hỏi"
                className="w-full p-2 border rounded-md mb-4 h-[500px]"
              />
            </div>
          ) : (
            <div>
              {/* Manual Input Mode: Input single question */}
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
              <div className="mb-4">
                <p className="text-gray-700">Chọn câu trả lời đúng:</p>
                <label className="block">
                  <input
                    type="radio"
                    value="A"
                    checked={question.correctAnswer === "A"}
                    onChange={() => setQuestion({ ...question, correctAnswer: "A" })}
                    className="mr-2"
                  />
                  Option A
                </label>
                <label className="block">
                  <input
                    type="radio"
                    value="B"
                    checked={question.correctAnswer === "B"}
                    onChange={() => setQuestion({ ...question, correctAnswer: "B" })}
                    className="mr-2"
                  />
                  Option B
                </label>
                <label className="block">
                  <input
                    type="radio"
                    value="C"
                    checked={question.correctAnswer === "C"}
                    onChange={() => setQuestion({ ...question, correctAnswer: "C" })}
                    className="mr-2"
                  />
                  Option C
                </label>
                <label className="block">
                  <input
                    type="radio"
                    value="D"
                    checked={question.correctAnswer === "D"}
                    onChange={() => setQuestion({ ...question, correctAnswer: "D" })}
                    className="mr-2"
                  />
                  Option D
                </label>
              </div>
            </div>
          )}

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
