// components/CourseList.tsx

import { useState } from 'react';
import { useCourses } from '../../hooks/useCourses';
import EditCourseForm from './components/EditCourseForm';
import { updateCourse, createCourse, deleteCourse } from '@/api/teacher';
import { Edit, Trash, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layouts';
import { useAuthStore } from '@/stores/auth-store';
import { Skeleton } from '@/components/ui/skeleton';

const CourseList = () => {

  const { _ui } = useAuthStore();

  const teacherId = _ui?.userId ?? 0;
  const { courses, loading, error, setCourses } = useCourses(teacherId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState<any>({});

  const handleEditClick = (course: any) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (courseId: number) => {
    try {
      await deleteCourse(courseId);
      setCourses((prevCourses) => prevCourses.filter(course => course.id !== courseId));
      console.log('Course deleted successfully');
    } catch (error: any) {
      console.error('Failed to delete course:', error.message);
    }
  };

  const handleSave = async (id: number, updatedData: any) => {
    const courseData = {
      id: id,
      name: updatedData.name,
      description: updatedData.description,
      schedule: updatedData.schedule,
      teacherId,
      studentIds: updatedData.studentIds || [],
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await updateCourse(id, courseData);
      setCourses((prevCourses) =>
        prevCourses.map(course => course.id === id ? { ...course, ...updatedData } : course)
      );
      setIsModalOpen(false);
    } catch (error: any) {
      console.error('Failed to update course:', error.message);
    }
  };

  const handleCreateCourse = async (_id: number, courseData: any) => {
    const errors: any = {};
    if (!courseData.name) errors.Name = 'The Name field is required.';
    if (!courseData.schedule) errors.Schedule = 'The Schedule field is required.';
    if (!courseData.description) errors.Description = 'The Description field is required.';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const coursePayload = {
        id: 0,
        name: courseData.name,
        description: courseData.description,
        schedule: courseData.schedule,
        teacherId,
        studentIds: courseData.studentIds || [],
        createdAt: new Date().toISOString(),
      };

      const response = await createCourse(coursePayload);
      setCourses((prevCourses) => [...prevCourses, response]);
      setIsModalOpen(false);
    } catch (error: any) {
      console.error('Failed to create course:', error.message);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-semibold mb-4">Các Khóa học đang dạy</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white p-4 border rounded-lg shadow-md">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-1/2 mb-3" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-24 rounded-md" />
                  <Skeleton className="h-8 w-20 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Các Khóa học đang dạy</h2>
          <button
            onClick={() => {
              setSelectedCourse(null);
              setIsModalOpen(true);
            }}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            <Plus size={16} />
            Tạo khóa học
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white p-6 border rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300"
            >
              <Link to={`/teacher/courses/${course.id}`} className="block">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{course.name}</h3>
                <p className="text-gray-700 mb-3">{course.description}</p>
                <p className="text-gray-500">Lịch học: {course.schedule}</p>
              </Link>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleEditClick(course)}
                  className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
                >
                  <Edit size={16} />
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => handleDeleteClick(course.id)}
                  className="text-sm px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2"
                >
                  <Trash size={16} />
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
              <button
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-lg"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
              <h3 className="text-xl font-bold mb-4">{selectedCourse ? 'Chỉnh sửa lớp học' : 'Tạo khóa học mới'}</h3>
              <EditCourseForm
                course={selectedCourse}
                onSave={selectedCourse ? handleSave : handleCreateCourse}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CourseList;
