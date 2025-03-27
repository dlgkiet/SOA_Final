import { fetchCourseById, fetchLessons } from "@/api/teacher";
import Layout from "@/components/layouts";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';  // Import useParams từ react-router-dom


const CourseDetail = () => {

  const { id } = useParams();  // Lấy ID khóa học từ URL (tham số :id)
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]); // Dữ liệu bài học
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const teacherid = 2;

  useEffect(() => {
    const loadCourseData = async () => {
      if (!id) return;  // Kiểm tra nếu không có ID
      

      try {
        const courseData = await fetchCourseById(Number(id));  // Gọi API lấy khóa học
        setCourse(courseData);  // Lưu thông tin khóa học vào state

        
        const lessonsData = await fetchLessons(teacherid, Number(id)); // Giả sử teacherId có trong course
        setLessons(lessonsData); // Lưu dữ liệu bài học vào state

        console.log(lessonsData);
      } catch (err: any) {
        setError('Lỗi tải khóa học: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [id]);  // Khi ID thay đổi (ví dụ: người dùng mở khóa học khác), gọi lại useEffect

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

 


  const tests = [
    {
      id: 1,
      content: 'Bài kiểm tra giữa kỳ: Kiểm tra kiến thức về HTML, CSS và JavaScript cơ bản.',
      studentId: 101, // Giả sử học sinh có ID = 101
      teacherId: 2,
      deadline: '2025-04-01T23:59:59',
      courseId: 1,
    },
    {
      id: 2,
      content: 'Bài kiểm tra cuối kỳ: Kiểm tra kiến thức về JavaScript nâng cao và React.',
      studentId: 102, // Giả sử học sinh có ID = 102
      teacherId: 2,
      deadline: '2025-06-01T23:59:59',
      courseId: 1,
    },
  ];
    

  // const students : any = [];

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
    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
      Tạo bài học mới
    </button>
    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Tạo bài kiểm tra mới
    </button>
    <button className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600">
      Danh sách sinh viên của lớp
    </button>
  </div>


  {/* Bài học */}
  <div className="mb-8">
    <h3 className="text-2xl font-semibold mb-4">Bài học</h3>
    {lessons.length > 0 ? (
      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="bg-white p-4 border rounded-lg shadow-md">
            <h4 className="text-xl font-medium mb-2">Bài học {lesson.id}</h4>
            <p className="text-gray-700">{lesson.content}</p>
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
            <h4 className="text-xl font-medium mb-2">Bài kiểm tra {test.id}</h4>
            <p className="text-gray-700">{test.content}</p>
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
