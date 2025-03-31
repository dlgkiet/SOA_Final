import axiosInstance from '../utils/axiosInstance';

// Lấy danh sách khóa học mà sinh viên đang tham gia
export const fetchCoursesForStudent = async (studentId: number) => {
  try {
    const response = await axiosInstance.get('/courses'); // Lấy tất cả khóa học từ API

    // Lọc các khóa học mà sinh viên đang tham gia
    const filteredCourses = response.data.filter((course: any) =>
      course.studentIds?.includes(studentId)
    );

    return filteredCourses; // Trả về danh sách khóa học mà sinh viên đang tham gia
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch courses for student');
  }
};

// Lấy tất cả câu hỏi và lọc theo testId
export const fetchQuestionsByTestId = async (testId: number) => {
  try {
    const response = await axiosInstance.get("/Question"); // Lấy toàn bộ câu hỏi

    console.log(response)

    const filteredQuestions = response.data.filter((q: any) => q.testId === testId); // Lọc theo testId

    return filteredQuestions; // Trả về danh sách câu hỏi đã lọc
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Không thể lấy danh sách câu hỏi");
  }
};


// Gửi câu trả lời của sinh viên lên API
export const submitAnswers = async (studentId: number, testId: number, selectedAnswers: { questionId: number; selectedAnswer: string }[]) => {
  try {
    const response = await axiosInstance.post("/Answer/submit-answer", {
      studentId,
      testId,
      selectedAnswers,
    });

    return response.data; // Trả về kết quả từ server
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Không thể gửi bài kiểm tra");
  }
};