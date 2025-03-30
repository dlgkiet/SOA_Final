import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layouts";
import { fetchCoursesForStudent } from "@/api/student"; // Hàm gọi API lấy khóa học sinh viên đang tham gia
import { useAuthStore } from "@/stores/auth-store";

const CourseStudent = () => {
  const [courses, setCourses] = useState<any[]>([]); // State lưu trữ danh sách khóa học
  const [loading, setLoading] = useState<boolean>(true); // State để kiểm tra trạng thái loading
  const [error, setError] = useState<string | null>(null); // State để lưu lỗi nếu có

  const { _ui } = useAuthStore();


  const studentId = _ui?.userId; // ID của sinh viên (bạn có thể thay đổi theo logic của mình)

  console.log(studentId);


  // Fetch khóa học của sinh viên khi component mount
  useEffect(() => {
    const fetchCourses = async () => {
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
        <div className="container mx-auto p-6">Đang tải...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto p-6 text-red-500">{error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Danh sách khóa học</h2>
        </div>

        {/* Hiển thị các khóa học */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/student/courses/${course.id}`} className="block">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.name}</h3>
                <p className="text-gray-700 mb-2">{course.description}</p>
                <p className="text-gray-500 mb-3">Lịch học: {course.schedule}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CourseStudent;
