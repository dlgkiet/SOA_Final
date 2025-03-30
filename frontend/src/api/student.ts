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
