// components/CourseList.tsx
import { useState } from 'react';
import { useCourses } from '../../hooks/useCourses';
import EditCourseForm from './components/EditCourseForm';

const CourseList = () => {
  const teacherId = 2;
  const { courses, loading, error } = useCourses(teacherId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const handleEditClick = (course: any) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleSave = async (id: number, updatedData: any) => {
    console.log('Saving course:', id, updatedData);
    // TODO: Gọi API cập nhật tại đây và cập nhật lại state nếu cần
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Lớp đang dạy</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.name}</h3>
            <p className="text-gray-700 mb-2">{course.description}</p>
            <p className="text-gray-500 mb-3">Lịch học: {course.schedule}</p>
            <button
              onClick={() => handleEditClick(course)}
              className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Chỉnh sửa
            </button>
          </div>
        ))}
      </div>

      {/* Modal chỉnh sửa */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-lg"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">Chỉnh sửa lớp học</h3>

            {/* Sử dụng EditCourseForm */}
            <EditCourseForm
              course={selectedCourse}
              onSave={handleSave}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;
