using Microsoft.AspNetCore.Mvc;
using Service.Services;
using Service.IServices;
using Core.Entities;
using System.Threading.Tasks;
using DataAccess.IReposiories;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly IUserRepository _userRepository;

        public AuthController(AuthService authService, IUserRepository userRepository)
        {
            _authService = authService;
            _userRepository = userRepository;
        }

        // Đăng nhập cho Admin
        [HttpPost("admin")]
        public async Task<IActionResult> LoginAdmin([FromBody] LoginRequest request)
        {
            try
            {
                var token = await _authService.LoginAdminAsync(request.Email, request.Password);

                // Lấy Admin từ cơ sở dữ liệu
                var admin = await _userRepository.GetAdminByEmailAsync(request.Email);

                // Trả về Token, Role và thông tin Admin (trừ mật khẩu)
                return Ok(new
                {
                    Token = token,
                    Role = "admin",
                    UserId = admin?.Id,
                    Name = admin?.Name,
                    Birthday = admin?.Birthday,
                    Email = admin?.Email
                });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Invalid credentials");
            }
        }

        // Đăng nhập cho Teacher
        [HttpPost("teacher")]
        public async Task<IActionResult> LoginTeacher([FromBody] LoginRequest request)
        {
            try
            {
                var token = await _authService.LoginTeacherAsync(request.Email, request.Password);

                // Lấy Teacher từ cơ sở dữ liệu
                var teacher = await _userRepository.GetTeacherByEmailAsync(request.Email);

                // Trả về Token, Role và thông tin Teacher (trừ mật khẩu)
                return Ok(new
                {
                    Token = token,
                    Role = "teacher",
                    UserId = teacher?.Id,
                    Name = teacher?.Name,
                    Birthday = teacher?.Birthday,
                    Email = teacher?.Email
                });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Invalid credentials");
            }
        }

        // Đăng nhập cho Student
        [HttpPost("student")]
        public async Task<IActionResult> LoginStudent([FromBody] LoginRequest request)
        {
            try
            {
                var token = await _authService.LoginStudentAsync(request.Email, request.Password);

                // Lấy Student từ cơ sở dữ liệu
                var student = await _userRepository.GetStudentByEmailAsync(request.Email);

                // Trả về Token, Role và thông tin Student (trừ mật khẩu)
                return Ok(new
                {
                    Token = token,
                    Role = "student",
                    UserId = student?.Id,
                    Name = student?.Name,
                    Birthday = student?.Birthday,
                    Email = student?.Email
                });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Invalid credentials");
            }
        }
        // API Logout dùng chung cho tất cả user
        [HttpPost("logout")]
        //[Authorize] // Yêu cầu user phải đăng nhập trước khi logout
        public IActionResult Logout()
        {
            // Xóa cookie chứa token (nếu có)
            if (Request.Cookies["AuthToken"] != null)
            {
                Response.Cookies.Delete("AuthToken");
            }

            // Trả về trạng thái thành công
            return Ok(new { message = "Logged out successfully" });
        }
    }
}
