import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layouts";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { fetchCoursesForStudent, fetchLessons } from "@/api/student";
import { useAuthStore } from "@/stores/auth-store";

const CourseStudentDetail = () => {
  const { id } = useParams(); // Lấy ID khóa học từ URL
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {_ui} = useAuthStore();
  const studentId =_ui?.userId
  console.log(studentId);

  useEffect(() => {
    const loadCourseDetails = async () => {
      try {
        setLoading(true);
        
        // Kiểm tra nếu studentId chưa được xác định
        if (studentId === undefined) {
          throw new Error("Không tìm thấy ID sinh viên. Vui lòng đăng nhập lại.");
        }

        // Lấy danh sách khóa học mà sinh viên đang tham gia
        const courses = await fetchCoursesForStudent(studentId);
        
        // Tìm khóa học theo ID
        const selectedCourse = courses.find((c: any) => c.id === Number(id));
        if (!selectedCourse) throw new Error("Khóa học không tồn tại hoặc bạn không được cấp quyền.");

        setCourse(selectedCourse);

        // Lấy danh sách bài học
        const allLessons = await fetchLessons();
        const courseLessons = allLessons.filter((lesson: any) => lesson.courseId === Number(id));
        setLessons(courseLessons);

        // TODO: Lấy danh sách bài kiểm tra từ API khi có backend hỗ trợ
        setTests([]); // Hiện tại chưa có API lấy bài kiểm tra

      } catch (err: any) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourseDetails();
  }, [id]);

  if (loading) return <Skeleton className="h-8 w-full" />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold">{course?.name}</h2>
        <p className="text-gray-700 mt-2">{course?.description}</p>

        {/* Danh sách bài học */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold">Bài học</h3>
          {lessons.length > 0 ? (
            <ul className="mt-2">
              {lessons.map((lesson) => (
                <li key={lesson.id} className="p-4 bg-white shadow-md rounded-lg mb-4">
                  <h4 className="text-lg font-medium">{lesson.content}</h4>
                  {lesson.files && lesson.files.length > 0 && (
                    <div className="mt-2">
                      <p className="text-blue-600">File đính kèm:</p>
                      {lesson.files.map((fileUrl: string, index: number) => (
                        <a
                          key={index}
                          href={`http://localhost:7051${fileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline block"
                        >
                          {fileUrl.split("/").pop()}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>Chưa có bài học nào.</p>
          )}
        </div>

        {/* Danh sách bài kiểm tra */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold">Bài kiểm tra</h3>
          {tests.length > 0 ? (
            <ul className="mt-2">
              {tests.map((test) => (
                <li key={test.id} className="p-4 bg-white shadow-md rounded-lg mb-4">
                  <h4 className="text-lg font-medium">{test.title}</h4>
                  <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => window.location.href = `/tests/${test.id}`}
                  >
                    Làm bài kiểm tra
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Chưa có bài kiểm tra nào.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CourseStudentDetail;
