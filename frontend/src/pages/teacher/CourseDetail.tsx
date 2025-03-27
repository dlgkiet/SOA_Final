import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCourseById, fetchLessons, fetchTests } from "@/api/teacher"; // API lấy khóa học, bài học và bài kiểm tra
import Layout from "@/components/layouts";
import CreateTestModal from "./components/CreateTestModal"; // Modal tạo bài kiểm tra
import CreateLessonModal from "./components/CreateLessonModal"; // Modal tạo bài học

const CourseDetail = () => {
  const { id } = useParams(); // Lấy ID khóa học từ URL (tham số :id)
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]); // Dữ liệu bài học
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tests, setTests] = useState<any[]>([]); // Dữ liệu bài kiểm tra
  const [isTestModalOpen, setIsTestModalOpen] = useState<boolean>(false); // Trạng thái modal tạo bài kiểm tra
  const [isLessonModalOpen, setIsLessonModalOpen] = useState<boolean>(false); // Trạng thái modal tạo bài học

  const teacherId = 2; // Giả sử teacherId là 2

  // Callback khi bài kiểm tra mới được thêm
  const handleAddTest = (newTest: any) => {
    setTests((prevTests) => [...prevTests, newTest]); // Cập nhật danh sách bài kiểm tra
  };

  // Callback khi bài học mới được thêm
  const handleAddLesson = (newLesson: any) => {
    setLessons((prevLessons) => [...prevLessons, newLesson]); // Cập nhật danh sách bài học
  };

  // Fetch dữ liệu khóa học, bài học và bài kiểm tra khi component mount hoặc id thay đổi
  useEffect(() => {
    const loadCourseData = async () => {
      if (!id) return;

      try {
        const courseData = await fetchCourseById(Number(id));
        setCourse(courseData);

        const lessonsData = await fetchLessons(teacherId, Number(id));
        setLessons(lessonsData);

        const testsData = await fetchTests(Number(id));
        setTests(testsData);
      } catch (err: any) {
        setError("Lỗi tải dữ liệu: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Layout>
      <div className="container mx-auto p-6">
        {/* Header khóa học */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold">{course.name}</h2>
          <p className="text-gray-700 mt-2">{course.description}</p>
          <p className="text-gray-500 mt-1">Lịch học: {course.schedule}</p>
        </div>

        {/* Nút tạo bài học và bài kiểm tra mới */}
        <div className="flex gap-4 mb-6">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => setIsLessonModalOpen(true)} // Mở modal khi nhấn nút "Tạo bài học mới"
          >
            Tạo bài học mới
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setIsTestModalOpen(true)} // Mở modal khi nhấn nút "Tạo bài kiểm tra mới"
          >
            Tạo bài kiểm tra mới
          </button>
        </div>

        {/* Modal tạo bài kiểm tra mới */}
        <CreateTestModal
          isOpen={isTestModalOpen}
          onClose={() => setIsTestModalOpen(false)} // Đóng modal
          courseId={Number(id)} // Truyền ID khóa học vào modal
          onAddTest={handleAddTest} // Truyền hàm callback để cập nhật danh sách
        />

        {/* Modal tạo bài học mới */}
        <CreateLessonModal
          isOpen={isLessonModalOpen}
          onClose={() => setIsLessonModalOpen(false)} // Đóng modal
          courseId={Number(id)} // Truyền ID khóa học vào modal
          onAddLesson={handleAddLesson} // Truyền hàm callback để cập nhật danh sách bài học
        />

        {/* Bài học */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Bài học</h3>
          {lessons.length > 0 ? (
            <div className="space-y-4">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="bg-white p-4 border rounded-lg shadow-md">
                  <h4 className="text-xl font-medium mb-2">{lesson.content}</h4>  {/* Tiêu đề là nội dung bài học */}
                  {lesson.file && (
                    <a href={lesson.file} target="_blank" className="text-blue-600 mt-2 block">
                      Tải bài học (PDF, DOCX, v.v.)
                    </a>
                  )}
                  <p className="text-gray-500 text-sm mt-2">
                    Cập nhật lần cuối: {new Date(lesson.updatedAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>Chưa có bài học nào cho khóa học này.</p>
          )}
        </div>


        {/* Bài kiểm tra */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Bài kiểm tra</h3>
          {tests.length > 0 ? (
            <div className="space-y-4">
              {tests.map((test) => (
                <div key={test.id} className="bg-white p-4 border rounded-lg shadow-md">
                  {/* Tiêu đề bài kiểm tra là nội dung bài kiểm tra */}
                  <h4 className="text-xl font-medium mb-2">{test.content}</h4>  {/* Tiêu đề là nội dung của bài kiểm tra */}

                  {/* Hiển thị thời gian hết hạn */}
                  <p className="text-gray-500 text-sm mt-2">
                    Thời gian hết hạn: {new Date(test.deadline).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>Chưa có bài kiểm tra nào cho khóa học này.</p>
          )}
        </div>

      </div>
    </Layout>
  );
};

export default CourseDetail;
