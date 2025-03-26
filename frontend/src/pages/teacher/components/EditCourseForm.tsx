// components/EditCourseForm.tsx
import { useState, useEffect } from 'react';

interface EditCourseFormProps {
  course: any;
  onSave: (id: number, updatedData: any) => void;
  onClose: () => void;
}

const EditCourseForm = ({ course, onSave, onClose }: EditCourseFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    schedule: '',
  });

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name,
        description: course.description,
        schedule: course.schedule,
      });
    }
  }, [course]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(course.id, formData);
    onClose();
  };

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
