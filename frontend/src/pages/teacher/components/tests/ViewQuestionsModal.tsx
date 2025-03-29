import { useState, useEffect } from 'react';
import { fetchQuestions } from '@/api/teacher'; // Đảm bảo rằng API này đã được import
import { updateQuestion } from '@/api/teacher'; // Import hàm cập nhật câu hỏi

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
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null); // Track question being edited
  const [editedQuestion, setEditedQuestion] = useState<Question | null>(null); // Store edited question data

  useEffect(() => {
    if (isOpen && testId) {
      fetchQuestions(testId).then((data) => setQuestions(data)).catch((error) => console.error(error));
    }
  }, [isOpen, testId]);

  const handleEdit = (question: Question) => {
    setEditingQuestionId(question.id); // Set the question as being edited
    setEditedQuestion({ ...question }); // Set the edited data to match the question
  };

  const handleSave = async () => {
    if (editedQuestion) {
      try {
        console.log("Saving edited question:", editedQuestion);
        if (editedQuestion.id) {
          await updateQuestion(editedQuestion.id, editedQuestion); // Gọi API với id và dữ liệu câu hỏi đã chỉnh sửa
          setEditingQuestionId(null); // Clear the editing mode
          setEditedQuestion(null); // Clear edited question data
          fetchQuestions(testId).then((data) => setQuestions(data)); // Re-fetch questions
        } else {
          console.error('Câu hỏi không có id hợp lệ.');
        }
      } catch (error) {
        console.error("Error updating question", error);
      }
    }
  };


  const handleCancel = () => {
    setEditingQuestionId(null); // Cancel editing
    setEditedQuestion(null); // Reset edited data
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-3xl h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Danh sách câu hỏi</h2>
          {questions.length > 0 ? (
            <div>
              <ul>
                {questions.map((question, index) => (
                  <li key={question.id} className="mb-4 p-4 border-b">
                    <p className="font-medium">Câu {index + 1}: {question.content}</p>
                    <div className="mt-2">
                      <p>A: {question.optionA}</p>
                      <p>B: {question.optionB}</p>
                      <p>C: {question.optionC}</p>
                      <p>D: {question.optionD}</p>
                      <p className="font-semibold mt-2">Đáp án đúng: {question.correctAnswer}</p>

                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(question)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-2"
                      >
                        Chỉnh sửa
                      </button>

                      {/* Editing Form for current question */}
                      {editingQuestionId === question.id && editedQuestion && (
                        <div className="mt-4">
                          <div className="mb-4">
                            <input
                              type="text"
                              value={editedQuestion.content}
                              onChange={(e) => setEditedQuestion({ ...editedQuestion, content: e.target.value })}
                              className="w-full p-2 border rounded-md"
                            />
                          </div>
                          <div className="mb-4">
                            <input
                              type="text"
                              value={editedQuestion.optionA}
                              onChange={(e) => setEditedQuestion({ ...editedQuestion, optionA: e.target.value })}
                              className="w-full p-2 border rounded-md"
                            />
                          </div>
                          <div className="mb-4">
                            <input
                              type="text"
                              value={editedQuestion.optionB}
                              onChange={(e) => setEditedQuestion({ ...editedQuestion, optionB: e.target.value })}
                              className="w-full p-2 border rounded-md"
                            />
                          </div>
                          <div className="mb-4">
                            <input
                              type="text"
                              value={editedQuestion.optionC}
                              onChange={(e) => setEditedQuestion({ ...editedQuestion, optionC: e.target.value })}
                              className="w-full p-2 border rounded-md"
                            />
                          </div>
                          <div className="mb-4">
                            <input
                              type="text"
                              value={editedQuestion.optionD}
                              onChange={(e) => setEditedQuestion({ ...editedQuestion, optionD: e.target.value })}
                              className="w-full p-2 border rounded-md"
                            />
                          </div>
                          <div className="mb-4">
                            <input
                              type="text"
                              value={editedQuestion.correctAnswer}
                              onChange={(e) => setEditedQuestion({ ...editedQuestion, correctAnswer: e.target.value })}
                              className="w-full p-2 border rounded-md"
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={handleSave}
                              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                              Lưu
                            </button>
                            <button
                              onClick={handleCancel}
                              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                            >
                              Hủy
                            </button>
                          </div>
                        </div>
                      )}
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
