import { updateTest } from "@/api/teacher";
import { useState } from "react";

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

export default EditTestModal;