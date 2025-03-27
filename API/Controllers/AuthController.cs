using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Service.Services;

namespace API.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        // Đăng nhập cho Admin
        [HttpPost("admin")]
        public async Task<IActionResult> LoginAdmin([FromBody] LoginRequest request)
        {
            try
            {
                // Gọi AuthService để lấy token JWT
                var token = await _authService.LoginAdminAsync(request.Email, request.Password);
                return Ok(new { Token = token });
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
                // Gọi AuthService để lấy token JWT
                var token = await _authService.LoginTeacherAsync(request.Email, request.Password);
                return Ok(new { Token = token });
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
                // Gọi AuthService để lấy token JWT
                var token = await _authService.LoginStudentAsync(request.Email, request.Password);
                return Ok(new { Token = token });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Invalid credentials");
            }
        }
    }
}
