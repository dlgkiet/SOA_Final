import { Plus, Edit, Trash } from 'lucide-react'; // Import icon từ lucide-react
import { useState } from "react";
import { updateTest, deleteTest } from "@/api/teacher"; // Import API updateTest, deleteTest
import EditTestModal from './EditTestModal';

interface Test {
  id: number;
  content: string;
  deadline: string;
}

interface TestListProps {
  tests: Test[];
  teacherId: number; // Thêm teacherId
  courseId: number;  // Thêm courseId
  onUpdateTest: (testId: number, updatedTest: any) => void; // Callback khi bài kiểm tra được cập nhật
  onDeleteTest: (testId: number) => void; // Callback khi bài kiểm tra bị xóa
}

const TestList = ({ tests, teacherId, courseId, onUpdateTest, onDeleteTest }: TestListProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);

  const handleCreateQuestion = (testId: number) => {
    console.log('Tạo câu hỏi cho bài kiểm tra', testId);
  };

  const handleEditTest = (testId: number) => {
    const test = tests.find((test) => test.id === testId);
    setSelectedTest(test || null);
    setIsEditModalOpen(true);
  };

  const handleDeleteTest = async (testId: number) => {
    try {
      await deleteTest(testId);
      onDeleteTest(testId); // Truyền testId qua callback để cập nhật danh sách bài kiểm tra
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
              {/* Tiêu đề bài kiểm tra */}
              <h4 className="text-xl font-semibold mb-2">{test.content}</h4>

              {/* Thời gian hết hạn */}
              <p className="text-gray-500 text-sm mt-2">
                Thời gian hết hạn: {new Date(test.deadline).toLocaleString()}
              </p>

              {/* Các nút chức năng: Tạo câu hỏi, Chỉnh sửa, Xóa */}
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
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Chưa có bài kiểm tra nào cho khóa học này.</p>
      )}

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
    </div>
  );
};

export default TestList;
