using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Service.Services;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        // Đăng nhập cho Admin
        [HttpPost("login/admin")]
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
        [HttpPost("login/teacher")]
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
        [HttpPost("login/student")]
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
