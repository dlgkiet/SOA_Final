using Service.Services;
using Core.Entities;
using Service.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
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


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _answerService.DeleteAsync(id);
            return NoContent();
        }

        [HttpPost("submit-answer")]
        public async Task<IActionResult> SubmitAnswers([FromBody] SubmitAnswerDto dto)
        {
            await _answerService.SubmitAnswersAsync(dto);
            return Ok(new { message = "Answers submitted successfully." });
        }
    }
}
