import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCourseById, fetchLessons, fetchTests } from "@/api/teacher"; // API bên student
import Layout from "@/components/layouts";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const CourseStudentDetail = () => {
  const { id } = useParams(); // Lấy ID khóa học từ URL
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourseData = async () => {
      if (!id) return;

      try {
        const courseData = await fetchCourseById(Number(id));
        setCourse(courseData);

        const lessonsData = await fetchLessons(Number(id));
        setLessons(lessonsData);

        const testsData = await fetchTests(Number(id));
        setTests(testsData);
      } catch (err) {
        const errorMessage = "Lỗi tải dữ liệu: " + err.message;
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [id]);

  if (loading) return <Skeleton className="h-8 w-full" />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold">{course.name}</h2>
        <p className="text-gray-700 mt-2">{course.description}</p>

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
                      {lesson.files.map((fileUrl, index) => (
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
