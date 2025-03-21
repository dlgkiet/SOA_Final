using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Service.Services;

namespace API.Controllers
{
    // UserController.cs
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // Register Teacher
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

        // Register Student
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
    }
}
