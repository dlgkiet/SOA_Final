using Microsoft.AspNetCore.Mvc;
using Core.Entities;
using Service.IServices;

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
}
