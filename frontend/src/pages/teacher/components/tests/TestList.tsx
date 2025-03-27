import { Plus, Edit, Trash } from 'lucide-react'; // Import icon từ lucide-react
import { useState } from "react";
import { updateTest, deleteTest } from "@/api/teacher"; // Import API updateTest, deleteTest

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

const EditTestModal = ({ isOpen, onClose, test, teacherId, courseId, onUpdateTest }: any) => {
  const [content, setContent] = useState(test.content);
  const [deadline, setDeadline] = useState(test.deadline);

  const formattedDeadline = new Date(deadline).toISOString().slice(0, 16);

  const handleSubmit = async () => {
    const updatedTest = {
      id: test.id,
      content,
      deadline: new Date(deadline).toISOString(),
      teacherId,
      courseId,
    };

    try {
      const response = await updateTest(test.id, updatedTest);
      onUpdateTest(test.id, response); // Cập nhật bài kiểm tra trong danh sách
      onClose(); // Đóng modal
    } catch (error: any) {
      console.error("Chỉnh sửa bài kiểm tra thất bại:", error.message);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Chỉnh sửa bài kiểm tra</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Nội dung bài kiểm tra</label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Nhập nội dung bài kiểm tra"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Thời gian hết hạn</label>
            <input
              type="datetime-local"
              value={formattedDeadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Hủy
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Lưu
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default TestList;
