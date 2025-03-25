using Core.Entities;
using DataAccess.IReposiories;
using Service.IServices;


namespace Service.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly IQuestionRepository _questionRepository;

        public QuestionService(IQuestionRepository questionRepository)
        {
            _questionRepository = questionRepository;
        }

        public async Task<IEnumerable<Question>> GetAllAsync() => await _questionRepository.GetAllAsync();

        public async Task<Question> GetByIdAsync(int id) => await _questionRepository.GetByIdAsync(id);

        public async Task AddAsync(Question question) => await _questionRepository.AddAsync(question);

        public async Task UpdateAsync(Question question) => await _questionRepository.UpdateAsync(question);

        public async Task DeleteAsync(int id) => await _questionRepository.DeleteAsync(id);
    }
}
