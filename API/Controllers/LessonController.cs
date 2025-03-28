using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/lessons")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        private readonly ILessonService _lessonService;
        private readonly string _fileStoragePath = "wwwroot/uploads";

        public LessonController(ILessonService lessonService)
        {
            _lessonService = lessonService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lesson>>> GetAllLessons()
        {
            var lessons = await _lessonService.GetAllLessonsAsync();
            return Ok(lessons);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Lesson>> GetLessonById(int id)
        {
            var lesson = await _lessonService.GetLessonByIdAsync(id);
            if (lesson == null) return NotFound();
            return Ok(lesson);
        }

        [HttpPost]
        public async Task<ActionResult> AddLesson(Lesson lesson)
        {
            await _lessonService.AddLessonAsync(lesson);
            return CreatedAtAction(nameof(GetLessonById), new { id = lesson.Id }, lesson);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLesson(int id, Lesson lesson)
        {
            if (id != lesson.Id) return BadRequest();
            await _lessonService.UpdateLessonAsync(lesson);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLesson(int id)
        {
            await _lessonService.DeleteLessonAsync(id);
            return NoContent();
        }

        [HttpPost("{lessonId}/upload")]
        public async Task<IActionResult> UploadFiles(int lessonId, [FromForm] List<IFormFile> files)
        {
            var lesson = await _lessonService.GetLessonByIdAsync(lessonId);
            if (lesson == null)
            {
                return NotFound("Bài học không tồn tại.");
            }

            List<string> filePaths = new List<string>();

            if (!Directory.Exists(_fileStoragePath))
            {
                Directory.CreateDirectory(_fileStoragePath);
            }

            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    var fileName = $"{Guid.NewGuid()}_{file.FileName}";
                    var filePath = Path.Combine(_fileStoragePath, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    filePaths.Add($"/uploads/{fileName}"); // Lưu đường dẫn file
                }
            }

            lesson.Files ??= new List<string>(); // Nếu null, khởi tạo danh sách mới
            lesson.Files.AddRange(filePaths);
            await _lessonService.UpdateLessonAsync(lesson);

            return Ok(new { message = "Tải file lên thành công!", files = filePaths });
        }
    }
}
