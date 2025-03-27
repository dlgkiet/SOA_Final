import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginBackground from "@/assets/images/teacher-login-background.jpg";
import { loginTeacher } from "@/api/auth";
import { useAuthStore } from "@/stores/auth-store";
import { useShallow } from "zustand/react/shallow";
import Cookies from "js-cookie";

export default function TeacherLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { _ia, setUserInformation, setIsAuthenticated } = useAuthStore(
    useShallow((state) => state)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const response = await loginTeacher(inputs);
    if (response) {
      Cookies.set("AuthToken", response.token, { expires: 1, path: "/" }); // Lưu token vào cookie
      setIsAuthenticated(true);

      setUserInformation({
        userId: response.userId,
        name: response.name,
        birthday: response.birthday,
        email: response.email,
        role: response.role,
      });

      navigate("/");
    } else {
      setError("Email hoặc mật khẩu không đúng!");
    }

    setIsLoading(false);
  };
  
  
  
    useEffect(() => {
      if (_ia) {
        navigate('/', { replace: true })
      }
    }, [_ia, navigate])

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Form đăng nhập */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 md:px-10">
        <Link to="/" className="absolute top-6 left-6 flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <h1 className="font-semibold text-xl text-gray-800">LMS System</h1>
        </Link>

        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800">Đăng nhập</h2>
          <p className="text-gray-500 mb-6">Đăng nhập dành cho giảng viên</p>

          {error && <p className="text-red-500">{error}</p>} {/* Hiển thị lỗi */}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" name="email" value={inputs.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label>Mật khẩu</Label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} name="password" value={inputs.password} onChange={handleChange} required />
                <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-0" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Đăng nhập"}
            </Button>
          </form>
        </div>
      </div>

      {/* Hình nền bên phải */}
      <div className="w-full md:w-1/2 hidden md:block bg-cover bg-center" style={{ backgroundImage: `url(${LoginBackground})` }} />
    </div>
  );
}
