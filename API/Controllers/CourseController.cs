using Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using System.Threading.Tasks;

namespace API.Controllers
{

[Route("api/courses")]
[ApiController]
public class CourseController : ControllerBase
{
    private readonly ICourseService _courseService;

    public CourseController(ICourseService courseService)
    {
        _courseService = courseService;
    }

        // ✅ API: Lấy tất cả các lớp học
        [HttpGet]
        [Authorize(Policy = "StudentOrAdmin")]  // Phân quyền cho Admin, và Student
        public async Task<IActionResult> GetAllCourses()
        {
            var courses = await _courseService.GetAllCoursesAsync();
            return Ok(courses);
        }

    // ✅ API: Lấy thông tin lớp học theo ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCourseById(int id)
    {
        var course = await _courseService.GetCourseByIdAsync(id);
        if (course == null)
        {
            return NotFound(new { message = "Lớp học không tồn tại" });
        }
        return Ok(course);
    }

    // ✅ API: Tạo lớp học
    [HttpPost]
    public async Task<IActionResult> CreateCourse([FromBody] Course newCourse)
    {
        var createdCourse = await _courseService.CreateCourseAsync(newCourse);
        return CreatedAtAction(nameof(GetCourseById), new { id = createdCourse.Id }, createdCourse);
    }

    // ✅ API: Cập nhật lớp học
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCourse(int id, [FromBody] Course updatedCourse)
    {
        if (id != updatedCourse.Id)
        {
            return BadRequest(new { message = "ID không khớp" });
        }

        var course = await _courseService.UpdateCourseAsync(updatedCourse);
        if (course == null)
        {
            return NotFound(new { message = "Lớp học không tồn tại" });
        }

        return Ok(course);
    }

    // ✅ API: Xóa lớp học
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCourse(int id)
    {
        var isDeleted = await _courseService.DeleteCourseAsync(id);
        if (!isDeleted)
        {
            return NotFound(new { message = "Lớp học không tồn tại" });
        }
        return NoContent();
    }
}
}
