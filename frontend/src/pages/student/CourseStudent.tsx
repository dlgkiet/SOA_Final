import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layouts";
import { fetchCoursesForStudent } from "@/api/student";
import { useAuthStore } from "@/stores/auth-store";

const CourseStudent = () => {
  const [courses, setCourses] = useState<any[]>([]); // State lưu trữ danh sách khóa học
  const [loading, setLoading] = useState<boolean>(true); // State để kiểm tra trạng thái loading
  const [error, setError] = useState<string | null>(null); // State để lưu lỗi nếu có

  const { _ui } = useAuthStore();

  const studentId = _ui?.userId; // ID của sinh viên

  // Fetch khóa học của sinh viên khi component mount
  useEffect(() => {
    const fetchCourses = async () => {
      if (!studentId) {
        setError("Không có ID sinh viên.");
        setLoading(false);
        return;
      }
  
      try {
        const data = await fetchCoursesForStudent(studentId); // Gọi API để lấy khóa học của sinh viên
        setCourses(data); // Lưu khóa học vào state
      } catch (err: any) {
        setError("Lỗi khi tải khóa học: " + err.message); // Xử lý lỗi nếu có
      } finally {
        setLoading(false); // Đánh dấu loading đã xong
      }
    };
  
    fetchCourses(); // Gọi hàm fetchCourses khi component mount
  }, [studentId]);  

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto p-6 text-center text-gray-600">
          <div className="spinner-border animate-spin h-8 w-8 border-t-2 border-blue-600 rounded-full"></div>
          <p className="mt-4">Đang tải...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto p-6 text-red-500 text-center">{error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Danh sách khóa học</h2>
        </div>

        {/* Hiển thị các khóa học */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white p-6 border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            >
              <Link to={`/student/courses/${course.id}`} className="block">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{course.name}</h3>
                <p className="text-gray-700 mb-3">{course.description}</p>
                <p className="text-gray-500 mb-3">
                  <span className="font-medium">Lịch học:</span> {course.schedule}
                </p>
              </Link>
              <div className="mt-4">
                <Link
                  to={`/student/courses/${course.id}`}
                  className="text-blue-600 hover:underline text-sm font-medium transition-colors duration-300"
                >
                  Truy cập khóa học →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CourseStudent;
