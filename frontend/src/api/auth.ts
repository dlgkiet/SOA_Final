import axiosInstance from "@/utils/axiosInstance";

interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse {
  userId: number;
  name: string | null | undefined;
  email: string | undefined;
  birthday: Date | undefined;
  role: string | undefined;
  token: string;
}

// Đăng nhập Admin
export const loginAdmin = async (
  data: ILoginRequest
): Promise<ILoginResponse | null> => {
  try {
    const response = await axiosInstance.post<ILoginResponse>(
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
  data: ILoginRequest
): Promise<ILoginResponse | null> => {
  try {
    const response = await axiosInstance.post<ILoginResponse>(
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
  data: ILoginRequest
): Promise<ILoginResponse | null> => {
  try {
    const response = await axiosInstance.post<ILoginResponse>(
      "/login/student",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Student login failed", error);
    return null;
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post("/login/logout");
    return true;
  } catch (error) {
    console.error("Logout failed", error);
    return false;
  }
};

// Cập nhật thông tin cá nhân
export const updatePersonalInfo = async (
  id: number,
  data: {
    name: string;
    birthday: string;
    email: string;
  }
) => {
  const res = await axiosInstance.put(`/user/update/personal-info/${id}`, data);
  return res.data;
};

// Cập nhật mật khẩu
export const updatePassword = async (id: number, newPassword: string) => {
  const res = await axiosInstance.put(
    `/user/update/password/${id}`,
    newPassword,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return res.data;
};
