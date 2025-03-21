using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Service.Services;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // Đăng ký Teacher
        [HttpPost("register/teacher")]
        public async Task<IActionResult> RegisterTeacher([FromBody] Teacher teacher)
        {
            if (teacher == null)
            {
                return BadRequest("Teacher data is required");
            }

            var createdTeacher = await _userService.RegisterTeacherAsync(teacher);
            return CreatedAtAction(nameof(RegisterTeacher), new { id = createdTeacher.Id }, createdTeacher);
        }

        // Đăng ký Student
        [HttpPost("register/student")]
        public async Task<IActionResult> RegisterStudent([FromBody] Student student)
        {
            if (student == null)
            {
                return BadRequest("Student data is required");
            }

            var createdStudent = await _userService.RegisterStudentAsync(student);
            return CreatedAtAction(nameof(RegisterStudent), new { id = createdStudent.Id }, createdStudent);
        }

        // Lấy tất cả Teacher
        [HttpGet("teachers")]
        public async Task<IActionResult> GetAllTeachers()
        {
            var teachers = await _userService.GetAllTeachersAsync();
            return Ok(teachers);
        }

        // Lấy tất cả Student
        [HttpGet("students")]
        public async Task<IActionResult> GetAllStudents()
        {
            var students = await _userService.GetAllStudentsAsync();
            return Ok(students);
        }

        // Lấy Teacher theo ID
        [HttpGet("teacher/{id}")]
        public async Task<IActionResult> GetTeacherById(int id)
        {
            var teacher = await _userService.GetTeacherByIdAsync(id);
            if (teacher == null)
            {
                return NotFound($"Teacher with ID {id} not found.");
            }
            return Ok(teacher);
        }

        // Lấy Student theo ID
        [HttpGet("student/{id}")]
        public async Task<IActionResult> GetStudentById(int id)
        {
            var student = await _userService.GetStudentByIdAsync(id);
            if (student == null)
            {
                return NotFound($"Student with ID {id} not found.");
            }
            return Ok(student);
        }

        // Cập nhật password
        [HttpPut("update/password/{id}")]
        public async Task<IActionResult> UpdatePassword(int id, [FromBody] string newPassword)
        {
            if (string.IsNullOrEmpty(newPassword))
            {
                return BadRequest("Password is required");
            }

            var result = await _userService.UpdatePasswordAsync(id, newPassword);
            if (result)
            {
                return Ok("Password updated successfully");
            }
            return NotFound($"User with ID {id} not found");
        }

        // Cập nhật thông tin cá nhân (không bao gồm password)
        [HttpPut("update/personal-info/{id}")]
        public async Task<IActionResult> UpdatePersonalInfo(int id, [FromBody] UpdatePersonalInfoDto dto)
        {
            if (dto == null)
            {
                return BadRequest("Personal info data is required");
            }

            var result = await _userService.UpdatePersonalInfoAsync(id, dto.Name, dto.Birthday, dto.Email, dto.ClassId);
            if (result)
            {
                return Ok("Personal info updated successfully");
            }
            return NotFound($"User with ID {id} not found");
        }
    }

}
