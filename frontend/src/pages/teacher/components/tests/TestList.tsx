import { Plus, Edit, Trash, Eye } from 'lucide-react'; // Import icons from lucide-react
import { useState } from "react";
import { deleteTest } from "@/api/teacher"; // Import API updateTest, deleteTest
import EditTestModal from './EditTestModal'; // Import the EditTestModal component
import CreateQuestionModal from './CreateQuestionModal';

interface Test {
  id: number;
  content: string;
  deadline: string;
}

interface TestListProps {
  tests: Test[];
  teacherId: number; // Teacher ID
  courseId: number;  // Course ID
  onUpdateTest: (testId: number, updatedTest: any) => void; // Callback when test is updated
  onDeleteTest: (testId: number) => void; // Callback when test is deleted
}

const TestList = ({ tests, teacherId, courseId, onUpdateTest, onDeleteTest }: TestListProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [isCreateQuestionModalOpen, setIsCreateQuestionModalOpen] = useState(false);

  // Handle creating a question for a test
  const handleCreateQuestion = (testId: number) => {
    console.log('Tạo câu hỏi cho bài kiểm tra', testId); // Kiểm tra testId ở đây
    setSelectedTest(tests.find((test) => test.id === testId) || null); // Cập nhật selectedTest đúng cách
    setIsCreateQuestionModalOpen(true); // Mở modal tạo câu hỏi
  };

  const handleViewQuestions = (testId: Number) => {
    console.log(testId);
  }

  // Handle editing a test
  const handleEditTest = (testId: number) => {
    const test = tests.find((test) => test.id === testId);
    setSelectedTest(test || null);
    setIsEditModalOpen(true); // Open edit modal
  };

  const handleAddQuestion = () => {
    console.log("ok")
  }

  // Handle deleting a test
  const handleDeleteTest = async (testId: number) => {
    try {
      await deleteTest(testId);
      onDeleteTest(testId); // Pass the testId to callback to update the test list
    } catch (error: any) {
      console.error("Xóa bài kiểm tra thất bại:", error.message);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold mb-4">Bài kiểm tra</h3>
      {tests.length > 0 ? (
        <div className="space-y-4">
          {tests.map((test) => (
            <div key={test.id} className="bg-white p-6 border rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out">
              {/* Test title */}
              <h4 className="text-xl font-semibold mb-2">{test.content}</h4>

              {/* Test deadline */}
              <p className="text-gray-500 text-sm mt-2">
                Thời gian hết hạn: {new Date(test.deadline).toLocaleString()}
              </p>

              {/* Buttons: Create question, Edit, Delete */}
              <div className="flex gap-4 mt-4 justify-end">
                <button
                  onClick={() => handleCreateQuestion(test.id)}
                  className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  <Plus size={16} />
                  Tạo câu hỏi
                </button>

                <button
                  onClick={() => handleEditTest(test.id)}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  <Edit size={16} />
                  Chỉnh sửa
                </button>

                <button
                  onClick={() => handleDeleteTest(test.id)}
                  className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  <Trash size={16} />
                  Xóa
                </button>
                <button
                  onClick={() => handleViewQuestions(test.id)}
                  className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  <Eye size={16} />  {/* Sử dụng Eye icon */}
                  Xem danh sách câu hỏi
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Chưa có bài kiểm tra nào cho khóa học này.</p>
      )}

      {/* Edit Test Modal */}
      {selectedTest && (
        <EditTestModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          test={selectedTest}
          teacherId={teacherId}
          courseId={courseId}
          onUpdateTest={onUpdateTest}
        />
      )}

      {/* Create Question Modal */}
      {isCreateQuestionModalOpen && (
        <CreateQuestionModal
          isOpen={isCreateQuestionModalOpen}
          onClose={() => setIsCreateQuestionModalOpen(false)}
          testId={selectedTest?.id || 0}
          modalTitle={selectedTest?.content}
          onSubmit={handleAddQuestion}  // Đảm bảo hàm này được truyền vào đúng cách
        />
      )}
    </div>
  );
};

export default TestList;
