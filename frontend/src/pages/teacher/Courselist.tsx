import { useCourses } from '../../hooks/useCourses';

const CourseList = () => {
  const teacherId = 2;
  const { courses, loading, error } = useCourses(teacherId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Lớp đang dạy</h2>

      {/* Các card hiển thị danh sách lớp học */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.name}</h3>
            <p className="text-gray-700 mb-2">{course.description}</p>
            <p className="text-gray-500">Lịch học: {course.schedule}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
