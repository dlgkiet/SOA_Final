import axiosInstance from "../utils/axiosInstance";

// Lấy danh sách khóa học mà sinh viên đang tham gia
export const fetchCoursesForStudent = async (studentId: number) => {
  try {
    const response = await axiosInstance.get("/courses"); // Lấy tất cả khóa học từ API

    // Lọc các khóa học mà sinh viên đang tham gia
    const filteredCourses = response.data.filter((course: any) =>
      course.studentIds?.includes(studentId)
    );
    console.log(response.data)
    console.log(filteredCourses)
    return filteredCourses; // Trả về danh sách khóa học mà sinh viên đang tham gia
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch courses for student"
    );
  }
};

// Lấy tất cả bài học
export const fetchLessons = async () => {
  try {
    const response = await axiosInstance.get("/lessons");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch lessons");
  }
};

// Lấy bài học theo ID
export const fetchLessonById = async (lessonId: number) => {
  try {
    const response = await axiosInstance.get(`/lessons/${lessonId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Lesson not found");
  }
};

// Upload file lên bài học
export const uploadLessonFiles = async (lessonId: number, files: FileList) => {
  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await axiosInstance.post(
      `/lessons/${lessonId}/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to upload files");
  }
};
