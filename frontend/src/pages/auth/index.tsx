import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-10 text-center">
        {/* Logo LMS System */}
        <div className="flex items-center justify-center mb-5 space-x-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">LMS System</span>
        </div>

        <h2 className="text-2xl font-bold mb-4">Hệ thống Học trực tuyến</h2>

        {/* Nút đăng nhập */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/teacher-login")}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
          >
            Giảng viên đăng nhập
          </button>
          <button
            onClick={() => navigate("/student-login")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg"
          >
            Người học đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
