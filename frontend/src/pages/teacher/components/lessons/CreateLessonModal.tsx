import { useState } from "react";
import { createLesson } from "@/api/teacher"; // Đảm bảo bạn đã tạo hàm createLesson trong API
import { useAuthStore } from "@/stores/auth-store";

interface CreateLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
  onAddLesson: (newLesson: any) => void;  // Callback để cập nhật danh sách bài học
}

const CreateLessonModal = ({ isOpen, onClose, courseId, onAddLesson }: CreateLessonModalProps) => {
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<string>("");


  const { _ui } = useAuthStore();

  const handleSubmit = async () => {
    if (!content || !file) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const lessonData = {
      content,
      file,
      teacherId: _ui?.userId,  // Giả sử teacherId là 2
      courseId,
      createdAt: new Date().toISOString(),  // Thời gian tạo hiện tại
      updatedAt: new Date().toISOString(),  // Thời gian cập nhật hiện tại
      id: 0,  // ID = 0 khi tạo mới
    };

    try {
      const response = await createLesson(lessonData);  // Gọi API tạo bài học
      console.log("Lesson created successfully:", response);
      onAddLesson(response); // Cập nhật danh sách bài học với bài học vừa tạo
      onClose(); // Đóng modal sau khi tạo bài học thành công
    } catch (error: any) {
      console.error("Failed to create lesson:", error.message);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Tạo bài học mới</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Nội dung bài học</label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Nhập nội dung bài học"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tệp bài học</label>
            <input
              type="text"
              value={file}
              onChange={(e) => setFile(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Nhập đường dẫn tệp bài học"
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

export default CreateLessonModal;
