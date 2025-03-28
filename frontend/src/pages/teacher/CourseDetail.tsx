import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCourseById,
  fetchLessons,
  fetchTests,
  uploadLessonFile,
} from "@/api/teacher"; // API lấy khóa học, bài học và bài kiểm tra
import Layout from "@/components/layouts";
import CreateTestModal from "./components/tests/CreateTestModal"; // Modal tạo bài kiểm tra
import CreateLessonModal from "./components/lessons/CreateLessonModal"; // Modal tạo bài học
import TestList from "./components/tests/TestList";
import { useAuthStore } from "@/stores/auth-store";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CourseDetail = () => {
  const { id } = useParams(); // Lấy ID khóa học từ URL (tham số :id)
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]); // Dữ liệu bài học
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tests, setTests] = useState<any[]>([]); // Dữ liệu bài kiểm tra
  const [isTestModalOpen, setIsTestModalOpen] = useState<boolean>(false); // Trạng thái modal tạo bài kiểm tra
  const [isLessonModalOpen, setIsLessonModalOpen] = useState<boolean>(false); // Trạng thái modal tạo bài học
  const [selectedFiles, setSelectedFiles] = useState<{
    [lessonId: number]: {
      file: File;
      previewUrl: string;
    };
  }>({});

  // State for save confirmation dialog
  const [saveConfirmation, setSaveConfirmation] = useState<{
    isOpen: boolean;
    lessonId: number | null;
  }>({
    isOpen: false,
    lessonId: null,
  });

  // const teacherId = 2; 

  const { _ui } = useAuthStore();

  const teacherId = _ui?.userId;

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

        const lessonsData = await fetchLessons(Number(teacherId), Number(id));
        setLessons(lessonsData);

        const testsData = await fetchTests(Number(id));
        setTests(testsData);
      } catch (err: any) {
        const errorMessage = "Lỗi tải dữ liệu: " + err.message;
        setError(errorMessage);
        toast.error(errorMessage); // Hiển thị toast báo lỗi
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [id]);


  // Callback khi bài kiểm tra được chỉnh sửa
  const handleUpdateTest = (testId: number, updatedTest: any) => {
    setTests((prevTests) =>
      prevTests.map((test) => (test.id === testId ? updatedTest : test))
    ); // Cập nhật bài kiểm tra trong danh sách
  };

  // Callback khi bài kiểm tra bị xóa
  const handleDeleteTest = (testId: number) => {
    setTests((prevTests) => prevTests.filter((test) => test.id !== testId)); // Xóa bài kiểm tra khỏi danh sách
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    lessonId: number
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create a preview URL for the file
    const previewUrl = URL.createObjectURL(file);

    // Update selected files state
    setSelectedFiles((prev) => ({
      ...prev,
      [lessonId]: { file, previewUrl },
    }));
  };

  const handleRemoveFile = (lessonId: number) => {
    // Revoke the preview URL to free up memory
    const fileToRemove = selectedFiles[lessonId];
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.previewUrl);
    }

    // Remove the file from selected files
    const { [lessonId]: removed, ...rest } = selectedFiles;
    setSelectedFiles(rest);
  };

  const handleSaveFileConfirm = async () => {
    const lessonId = saveConfirmation.lessonId;
    if (!lessonId) return;

    const selectedFile = selectedFiles[lessonId];
    if (!selectedFile) return;

    try {
      // Gọi API upload file
      const uploadResponse = await uploadLessonFile(
        lessonId,
        selectedFile.file
      );

      // Cập nhật danh sách bài học bằng cách merge file cũ và file mới
      setLessons((prevLessons) =>
        prevLessons.map((lesson) =>
          lesson.id === lessonId
            ? {
              ...lesson,
              // Nếu lesson đã có file, gộp chúng với file mới, ngược lại chỉ dùng file mới
              files: [...(lesson.files || []), ...uploadResponse.files],
              updatedAt: new Date().toISOString(),
            }
            : lesson
        )
      );

      // Xóa file đã chọn
      handleRemoveFile(lessonId);

      // Đóng dialog xác nhận
      setSaveConfirmation({ isOpen: false, lessonId: null });

      // Hiển thị thông báo thành công
      toast.success(uploadResponse.message || "Tải file lên thành công!");
    } catch (error: any) {
      // Xử lý lỗi
      toast.error(error.message || "Lỗi tải file!");
      setSaveConfirmation({ isOpen: false, lessonId: null });
      console.error("Upload error:", error);
    }
  };

  const openSaveConfirmation = (lessonId: number) => {
    setSaveConfirmation({
      isOpen: true,
      lessonId: lessonId,
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto p-6">
          {/* Skeleton cho tiêu đề khóa học */}
          <div className="mb-6">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-5 w-1/4 mt-2" />
          </div>

          {/* Skeleton cho nút */}
          <div className="flex gap-4 mb-6">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-40" />
          </div>

          {/* Skeleton cho danh sách bài học */}
          <div className="mb-8">
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>

          {/* Skeleton cho danh sách bài kiểm tra */}
          <div>
            <div className="space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-6">
        {error && <p className="text-red-500 mt-4">{error}</p>}
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
                <div
                  key={lesson.id}
                  className="bg-white p-4 border rounded-lg shadow-md"
                >
                  <h4 className="text-xl font-medium mb-2">{lesson.content}</h4>

                  <div className="flex items-center space-x-4 mb-2">
                    <Label
                      htmlFor={`file-upload-${lesson.id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 inline-block"
                    >
                      Tải tệp lên
                    </Label>
                    <input
                      id={`file-upload-${lesson.id}`}
                      type="file"
                      accept=".docx,.pdf,.xls,.xlsx,.ppt,.pptx"
                      className="hidden"
                      onChange={(e) => handleFileSelect(e, lesson.id)}
                    />
                  </div>
                  <p className="text-gray-500 text-sm mb-2">
                    Hỗ trợ các định dạng: .docx, .pdf, .xls, .xlsx, .ppt, .pptx
                  </p>

                  {/* Hiển thị file đã chọn */}
                  {selectedFiles[lesson.id] && (
                    <div className="bg-gray-100 p-3 rounded-md mb-2 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">
                          {selectedFiles[lesson.id].file.name}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveFile(lesson.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button onClick={() => openSaveConfirmation(lesson.id)}>
                        Lưu
                      </Button>
                    </div>
                  )}

                  {/* Hiển thị file đã tải lên trước đó */}
                  {lesson.files && lesson.files.length > 0 && (
                    <div className="mt-2">
                      <p className="text-blue-600">File đã tải lên:</p>
                      {lesson.files.map((fileUrl: string, index: number) => {
                        const fileNameWithGuid = fileUrl.split("/").pop();
                        let displayFileName = fileNameWithGuid;
                        if (
                          fileNameWithGuid &&
                          fileNameWithGuid.includes("_")
                        ) {
                          displayFileName = fileNameWithGuid.substring(
                            fileNameWithGuid.indexOf("_") + 1
                          );
                        }
                        return (
                          <p key={index}>
                            <a
                              href={`http://localhost:7051${fileUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline"
                            >
                              {displayFileName}
                            </a>
                          </p>
                        );
                      })}
                    </div>
                  )}

                  <p className="text-gray-500 text-sm mt-2">
                    Cập nhật lần cuối:{" "}
                    {new Date(lesson.updatedAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>Chưa có bài học nào cho khóa học này.</p>
          )}
        </div>

        <Dialog
          open={saveConfirmation.isOpen}
          onOpenChange={(open) =>
            setSaveConfirmation((prev) => ({
              ...prev,
              isOpen: open,
            }))
          }
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Xác nhận lưu thay đổi</DialogTitle>
              <DialogDescription>
                Bạn có chắc muốn lưu thay đổi không?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Hủy</Button>
              </DialogClose>
              <Button onClick={handleSaveFileConfirm}>Xác nhận</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Bài kiểm tra */}
        <TestList
          tests={tests}
          teacherId={Number(teacherId)}
          courseId={Number(id)}
          onUpdateTest={handleUpdateTest}
          onDeleteTest={handleDeleteTest}
        />
      </div>
    </Layout>
  );
};

export default CourseDetail;
