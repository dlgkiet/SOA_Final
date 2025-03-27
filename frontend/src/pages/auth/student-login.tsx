import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginBackground from "@/assets/images/student-login-background.jpg";

export default function StudentLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    // e.preventDefault();
    // loginMutate({ email: inputs.email, password: inputs.password });
  };

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
          <p className="text-gray-500 mb-6">Đăng nhập dành cho sinh viên</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="text" name="email" value={inputs.email} onChange={handleChange} required />
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

            <Button type="submit" className="w-full" /* disabled={isLoginLoading} */>
              {/* {isLoginLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Đăng nhập"} */}
              Đăng nhập
            </Button>
          </form>
        </div>
      </div>

      {/* Hình nền bên phải */}
      <div className="w-full md:w-1/2 hidden md:block bg-cover bg-center" style={{ backgroundImage: `url(${LoginBackground})` }} />
    </div>
  );
}
