using DataAccess.IReposiories;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class AuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly string _secretKey = "your_very_strong_secret_key_12345";  // Thay bằng secret key thực tế của bạn

        public AuthService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // Đăng nhập cho Admin
        public async Task<string> LoginAdminAsync(string email, string password)
        {
            var admin = await _userRepository.GetAdminByEmailAsync(email);
            if (admin == null || admin.Password != password)  // Kiểm tra mật khẩu
            {
                throw new UnauthorizedAccessException("Invalid credentials");
            }

            return GenerateJwtToken(admin.Id.ToString(), "Admin");
        }

        // Đăng nhập cho Teacher
        public async Task<string> LoginTeacherAsync(string email, string password)
        {
            var teacher = await _userRepository.GetTeacherByEmailAsync(email);
            if (teacher == null || teacher.Password != password)  // Kiểm tra mật khẩu
            {
                throw new UnauthorizedAccessException("Invalid credentials");
            }

            return GenerateJwtToken(teacher.Id.ToString(), "Teacher");
        }

        // Đăng nhập cho Student
        public async Task<string> LoginStudentAsync(string email, string password)
        {
            var student = await _userRepository.GetStudentByEmailAsync(email);
            if (student == null || student.Password != password)  // Kiểm tra mật khẩu
            {
                throw new UnauthorizedAccessException("Invalid credentials");
            }

            return GenerateJwtToken(student.Id.ToString(), "Student");
        }

        // Phương thức tạo JWT Token
        private string GenerateJwtToken(string userId, string role)
        {
            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, userId),
            new Claim(ClaimTypes.Role, role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: "your_issuer",  // Thay bằng issuer thực tế của bạn
                audience: "your_audience",  // Thay bằng audience thực tế của bạn
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

}
