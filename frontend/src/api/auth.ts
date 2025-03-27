import axiosInstance from "@/utils/axiosInstance";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

// Đăng nhập Admin
export const loginAdmin = async (
  data: LoginRequest
): Promise<LoginResponse | null> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      "/login/admin",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Admin login failed", error);
    return null;
  }
};

// Đăng nhập Teacher
export const loginTeacher = async (
  data: LoginRequest
): Promise<LoginResponse | null> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      "/login/teacher",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Teacher login failed", error);
    return null;
  }
};

// Đăng nhập Student
export const loginStudent = async (
  data: LoginRequest
): Promise<LoginResponse | null> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      "/login/student",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Student login failed", error);
    return null;
  }
};
