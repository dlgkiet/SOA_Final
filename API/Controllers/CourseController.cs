using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpPost("enroll")]
        public async Task<IActionResult> EnrollStudent([FromBody] EnrollmentDto enrollmentDto)
        {
            if (enrollmentDto == null)
                return BadRequest("Invalid data");

            var result = await _courseService.EnrollStudentAsync(enrollmentDto.StudentId, enrollmentDto.CourseId);
            if (!result)
                return BadRequest("Enrollment failed");

            return Ok("Student enrolled successfully");
        }

        [HttpGet("courses")]
        public async Task<IActionResult> GetCourses()
        {
            var courses = await _courseService.GetCoursesAsync();
            return Ok(courses);
        }
    }

    public class EnrollmentDto
    {
        public int StudentId { get; set; }
        public int CourseId { get; set; }
    }
}
