import { useState } from "react";
import { createTest } from "@/api/teacher"; // Đảm bảo bạn đã tạo hàm createTest trong file api

interface CreateTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
  onAddTest: (newTest: any) => void; // Callback để truyền bài kiểm tra mới cho component cha
}

const CreateTestModal = ({ isOpen, onClose, courseId, onAddTest }: CreateTestModalProps) => {
  const [content, setContent] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const handleSubmit = async () => {
    if (!content || !deadline) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const testData = {
      content,
      teacherId: 2, // Giả sử teacherId là 2
      deadline: new Date(deadline).toISOString(), // Đảm bảo thời gian là UTC
      courseId,
    };

    try {
      const response = await createTest(testData); // Gọi API tạo bài kiểm tra
      console.log("Test created successfully:", response);
      onAddTest(response); // Truyền bài kiểm tra mới cho component cha
      onClose(); // Đóng modal sau khi tạo bài kiểm tra thành công
    } catch (error: any) {
      console.error("Failed to create test:", error.message);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Tạo bài kiểm tra mới</h2>
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
              value={deadline}
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

export default CreateTestModal;
