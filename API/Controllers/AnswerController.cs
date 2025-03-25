using Service.Services;
using Core.Entities;
using Service.IServices;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswerController : ControllerBase
    {
        private readonly IAnswerService _answerService;

        public AnswerController(IAnswerService answerService)
        {
            _answerService = answerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _answerService.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id) => Ok(await _answerService.GetByIdAsync(id));

        [HttpPost]
        public async Task<IActionResult> Add(Answer answer)
        {
            await _answerService.AddAsync(answer);
            return CreatedAtAction(nameof(GetById), new { id = answer.Id }, answer);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _answerService.DeleteAsync(id);
            return NoContent();
        }
    }
}
