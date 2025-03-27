using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Service.IServices;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ITestService _testService;

        public TestController(ITestService testService)
        {
            _testService = testService;
        }

        // GET: api/test
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Test>>> GetAllTests()
        {
            var tests = await _testService.GetAllTestsAsync();
            return Ok(tests);
        }

        // GET: api/test/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Test>> GetTestById(int id)
        {
            var test = await _testService.GetTestByIdAsync(id);
            if (test == null)
            {
                return NotFound();
            }
            return Ok(test);
        }

        // POST: api/test
        [HttpPost]
        public async Task<ActionResult<Test>> CreateTest(Test test)
        {
            await _testService.AddTestAsync(test);
            return CreatedAtAction(nameof(GetTestById), new { id = test.Id }, test);
        }

        // PUT: api/test/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTest(int id, [FromBody] Test updatedTest)
        {
            // Kiểm tra nếu ID trong URL không khớp với ID trong body
            if (id != updatedTest.Id)
            {
                return BadRequest(new { message = "ID không khớp" });
            }

            // Gọi service để cập nhật bài kiểm tra và nhận lại bài kiểm tra đã được cập nhật
            var test = await _testService.UpdateTestAsync(updatedTest);

            // Trả về bài kiểm tra đã được cập nhật
            return Ok(test);
        }


        // DELETE: api/test/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTest(int id)
        {
            await _testService.DeleteTestAsync(id);
            return NoContent();
        }
    }
}
