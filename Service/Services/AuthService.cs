using DataAccess.IReposiories;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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

        return GenerateJwtToken(admin.Id.ToString(), "Admin", admin.Id);
    }

    // Đăng nhập cho Teacher
    public async Task<string> LoginTeacherAsync(string email, string password)
    {
        var teacher = await _userRepository.GetTeacherByEmailAsync(email);
        if (teacher == null || teacher.Password != password)  // Kiểm tra mật khẩu
        {
            throw new UnauthorizedAccessException("Invalid credentials");
        }

        return GenerateJwtToken(teacher.Id.ToString(), "Teacher", teacher.Id);
    }

    // Đăng nhập cho Student
    public async Task<string> LoginStudentAsync(string email, string password)
    {
        var student = await _userRepository.GetStudentByEmailAsync(email);
        if (student == null || student.Password != password)  // Kiểm tra mật khẩu
        {
            throw new UnauthorizedAccessException("Invalid credentials");
        }

        return GenerateJwtToken(student.Id.ToString(), "Student", student.Id);
    }

    // Phương thức tạo JWT Token với ID người dùng
    private string GenerateJwtToken(string userId, string role, int userRoleId)
    {
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, userId),
            new Claim(ClaimTypes.Role, role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("UserRoleId", userRoleId.ToString())  // Thêm ID người dùng vào claim
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
