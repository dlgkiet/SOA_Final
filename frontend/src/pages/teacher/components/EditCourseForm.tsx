import { useState, useEffect } from 'react';
import { fetchStudents } from '@/api/teacher';  // Import hàm fetchStudents

interface EditCourseFormProps {
  course?: any;  // `course` có thể không tồn tại khi tạo mới
  onSave: (id: number, updatedData: any) => void;
  onClose: () => void;
}

const EditCourseForm = ({ course, onSave, onClose }: EditCourseFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    schedule: '',
    studentIds: [] as number[],  // Lưu danh sách ID sinh viên đã chọn
  });
  const [students, setStudents] = useState<any[]>([]);  // Danh sách tất cả sinh viên
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchStudents();  // Gọi API để lấy danh sách sinh viên
        setStudents(data);  // Cập nhật danh sách sinh viên vào state
      } catch (error: any) {
        setError('Error fetching students');
      } finally {
        setLoading(false);
      }
    };
    loadStudents();
  }, []);

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name,
        description: course.description,
        schedule: course.schedule,
        studentIds: course.studentIds || [],  // Dữ liệu sinh viên của lớp được chọn
      });
    }
  }, [course]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const studentId = parseInt(value);
    setFormData((prev) => {
      const updatedStudentIds = checked
        ? [...prev.studentIds, studentId]
        : prev.studentIds.filter((id) => id !== studentId);
      return { ...prev, studentIds: updatedStudentIds };
    });
  };

  const handleSubmit = () => {
    if (course) {
      // Nếu có course, thực hiện update
      onSave(course.id, formData);
    } else {
      // Nếu không có course, thực hiện tạo mới
      const newCourseData = { ...formData, teacherId: 2, createdAt: new Date().toISOString() };
      onSave(0, newCourseData);  // Gửi id = 0 cho trường hợp tạo mới
    }
    onClose();
  };

  if (loading) return <div>Loading students...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-3">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="Tên lớp"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="Mô tả"
      />
      <input
        name="schedule"
        value={formData.schedule}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="Lịch học"
      />

      {/* Trường chọn sinh viên */}
      <div>
        <h4 className="font-semibold">Chọn sinh viên</h4>
        <div className="space-y-2">
          {students.map((student) => (
            <div key={student.id} className="flex items-center">
              <input
                type="checkbox"
                value={student.id}
                checked={formData.studentIds.includes(student.id)}
                onChange={handleStudentChange}
                className="mr-2"
              />
              <label>{student.name}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Hủy
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

export default EditCourseForm;
