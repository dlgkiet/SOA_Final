using Core.Entities;
using DataAccess.IReposiories;
using Service.IServices;

namespace Service.Services
{
    public class AnswerService : IAnswerService
    {
        private readonly IAnswerRepository _answerRepository;

        public AnswerService(IAnswerRepository answerRepository)
        {
            _answerRepository = answerRepository;
        }

        public async Task<IEnumerable<Answer>> GetAllAsync() => await _answerRepository.GetAllAsync();

        public async Task<Answer> GetByIdAsync(int id) => await _answerRepository.GetByIdAsync(id);

        public async Task<IEnumerable<Answer>> GetAnswersByTestIdAsync(int testId) => await _answerRepository.GetAnswersByTestIdAsync(testId);

        public async Task AddAsync(Answer answer) => await _answerRepository.AddAsync(answer);

        public async Task UpdateAsync(Answer answer) => await _answerRepository.UpdateAsync(answer);

        public async Task DeleteAsync(int id) => await _answerRepository.DeleteAsync(id);
    }
}
