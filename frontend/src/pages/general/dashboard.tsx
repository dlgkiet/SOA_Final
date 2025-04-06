import { useEffect, useState } from "react";
import Layout from "@/components/layouts";
import { useAuthStore } from "@/stores/auth-store";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { fetchCoursesForStudent } from "@/api/student";
import { fetchCourses } from "@/api/teacher";
import { toast } from "sonner";

const Dashboard = () => {
  const { _ui } = useAuthStore();
  const userName = _ui?.name || "Người dùng";
  const userRole = _ui?.role || "student";
  const userId = _ui?.userId;

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      if (userId === undefined) {
        // You can either show an error message or return early if userId is not available
        toast.error("User ID is undefined. Please log in.");
        return;
      }
  
      try {
        setLoading(true);
        let courseData = [];
  
        if (userRole === "student") {
          courseData = await fetchCoursesForStudent(userId);
        } else if (userRole === "teacher") {
          const allCourses = await fetchCourses();
          courseData = allCourses.filter((course: any) => course.teacherId === userId);
        }
  
        setCourses(courseData);
      } catch (err: any) {
        toast.error("Không thể tải khóa học: " + err.message);
      } finally {
        setLoading(false);
      }
    };
  
    loadCourses();
  }, [userRole, userId]);  

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8"> {/* Giữ nội dung căn đều */}
        <div className="mb-8">  
          <h1 className="text-3xl font-bold text-gray-800">Chào mừng, {userName} 👋</h1>
          <p className="text-gray-600 mt-1">
            {userRole === "teacher"
              ? "Dưới đây là bảng điều khiển giảng viên của bạn."
              : "Dưới đây là bảng điều khiển học sinh của bạn."}
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            📚 Khóa học
          </h2>

          {loading ? (
            <p className="text-gray-600">Đang tải khóa học...</p>
          ) : courses.length === 0 ? (
            <p className="text-gray-500 italic">Hiện chưa có khóa học nào.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"> 
              {courses.map((course) => (
                <Card key={course.id} className="shadow-md hover:shadow-lg transition">
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {course.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {course.description || "Không có mô tả"}
                    </p>
                    <Link
                      to={`/${userRole}/courses/${course.id}`}
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      Truy cập khóa học →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
