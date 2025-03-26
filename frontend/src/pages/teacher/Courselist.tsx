// components/CourseList.tsx
import { useState } from 'react';
import { useCourses } from '../../hooks/useCourses';
import EditCourseForm from './components/EditCourseForm';
import { updateCourse } from '@/api/teacher';
import { Edit, Trash } from 'lucide-react'; // Import các icon từ lucide-react


const CourseList = () => {
  const teacherId = 2;
  const { courses, loading, error } = useCourses(teacherId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const handleEditClick = (course: any) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (courseId: number) => {
    console.log('Deleting course:', courseId);
    // TODO: Gọi API xóa khóa học tại đây
  };

  const handleSave = async (id: number, updatedData: any) => {
    console.log('Saving course:', id, updatedData);
  
    // Dữ liệu cần gửi lên API
    const courseData = {
      id: id,
      name: updatedData.name,
      description: updatedData.description,
      schedule: updatedData.schedule,
      teacherId: 2, // Giả sử teacherId là 2, bạn có thể thay đổi giá trị này tùy theo yêu cầu
      studentIds: [1], // Giả sử chỉ có một học sinh, bạn có thể thay đổi danh sách học sinh này nếu cần
      createdAt: new Date().toISOString(), // Giả sử thời gian tạo là thời gian hiện tại
    };
  
    try {
      // Gọi hàm updateCourse từ API
      const response = await updateCourse(id, courseData);
      console.log('Course updated successfully:', response);
      setIsModalOpen(false);
      // Nếu cần, bạn có thể cập nhật lại danh sách khóa học trong state ở đây
    } catch (error: any) {
      console.error('Failed to update course:', error.message);
    }
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
             <div className='flex gap-2'>
             <button
                onClick={() => handleEditClick(course.id)}
                className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
              >
                <Edit size={16} /> {/* Icon chỉnh sửa */}
                Chỉnh sửa
              </button>
              <button
                onClick={() => handleDeleteClick(course.id)}
                className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2"
              >
                <Trash size={16} /> {/* Icon xóa */}
                Xóa
              </button>
             </div>
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
