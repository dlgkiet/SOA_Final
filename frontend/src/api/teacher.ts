
import axiosInstance from '../utils/axiosInstance';
//=====================================COURSE================================================
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
    return response.data;  
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

//=====================================END-COURSE================================================



//=====================================LESSONS================================================
export const fetchLessons = async (teacherId: number, courseId: number) => {
  try {
    const response = await axiosInstance.get('/lessons');

    const filteredLessons = response.data.filter((lesson: any) => {
      return lesson.teacherId === teacherId && lesson.courseId === courseId;
    });

    return filteredLessons;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch lessons');
  }
};

export const createLesson = async (lessonData: any) => {
  try {
    const response = await axiosInstance.post('/lessons', lessonData);
    return response.data; 
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create lesson');
  }
};


//=====================================END-LESSONS================================================

//=====================================TEST================================================

export const fetchTests = async (courseId: number) => {
  try {
    const response = await axiosInstance.get('/Test');
    
    const filteredTests = response.data.filter((test: any) => test.courseId === courseId);
    
    return filteredTests;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch tests');
  }
};

// Lấy thông tin bài kiểm tra theo id
export const fetchTestById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/tests/${id}`);
    return response.data;  
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch test');
  }
};

// Cập nhật bài kiểm tra
export const updateTest = async (id: number, testData: any) => {
  try {
    const response = await axiosInstance.put(`/tests/${id}`, testData);
    return response.data;  
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update test');
  }
};

// Tạo bài kiểm tra mới
export const createTest = async (testData: any) => {
  try {
    const response = await axiosInstance.post('/test', testData);
    return response.data;  
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create test');
  }
};

// Xóa bài kiểm tra
export const deleteTest = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/test/${id}`);
    return response.data;  
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete test');
  }
};

//=====================================END - TEST================================================
