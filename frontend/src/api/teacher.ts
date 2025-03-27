
import axiosInstance from '../utils/axiosInstance';

export const fetchCourses = async () => {
  try {
    const response = await axiosInstance.get('/courses');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch courses');
  }
};

export const updateCourse = async (id: number, courseData: any) => {
  try {
    const response = await axiosInstance.put(`/courses/${id}`, courseData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update course');
  }
};

export const createCourse = async (courseData: any) => {
  try {
    const response = await axiosInstance.post('/courses', courseData);
    return response.data;  // Trả về dữ liệu khóa học vừa được tạo
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create course');
  }
};

export const fetchStudents = async () => {
  try {
    const response = await axiosInstance.get('/User/students');
    return response.data;  // Trả về dữ liệu người dùng
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch students');
  }
};

export const deleteCourse = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/courses/${id}`);
    return response.data;  // Trả về dữ liệu trả về từ API nếu cần
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete course');
  }
};

export const fetchCourseById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/courses/${id}`);
    return response.data;  // Trả về thông tin khóa học
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch course');
  }
};

export const fetchLessons = async (teacherId: number, courseId: number) => {
  try {
    // Gửi yêu cầu GET tới API với các tham số teacherId và courseId
    const response = await axiosInstance.get('/lessons');

    // Lọc dữ liệu sau khi nhận được response
    const filteredLessons = response.data.filter((lesson: any) => {
      return lesson.teacherId === teacherId && lesson.courseId === courseId;
    });

    // Trả về dữ liệu đã lọc
    return filteredLessons;
  } catch (error: any) {
    // Xử lý lỗi nếu có
    throw new Error(error.response?.data?.message || 'Failed to fetch lessons');
  }
};

// Lấy tất cả các bài kiểm tra
export const fetchTests = async () => {
  try {
    const response = await axiosInstance.get('/tests');
    return response.data;  // Trả về danh sách bài kiểm tra
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch tests');
  }
};

// Lấy thông tin bài kiểm tra theo id
export const fetchTestById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/tests/${id}`);
    return response.data;  // Trả về bài kiểm tra theo id
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch test');
  }
};

// Cập nhật bài kiểm tra
export const updateTest = async (id: number, testData: any) => {
  try {
    const response = await axiosInstance.put(`/tests/${id}`, testData);
    return response.data;  // Trả về bài kiểm tra đã được cập nhật
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update test');
  }
};

// Tạo bài kiểm tra mới
export const createTest = async (testData: any) => {
  try {
    const response = await axiosInstance.post('/tests', testData);
    return response.data;  // Trả về bài kiểm tra vừa tạo
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create test');
  }
};

// Xóa bài kiểm tra
export const deleteTest = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/tests/${id}`);
    return response.data;  // Trả về kết quả xóa bài kiểm tra
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete test');
  }
};
