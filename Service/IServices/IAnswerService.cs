using Core.Entities;

namespace Service.IServices
{
    public interface IAnswerService
    {
        Task<IEnumerable<Answer>> GetAllAsync();
        Task<Answer> GetByIdAsync(int id);
        Task<IEnumerable<Answer>> GetAnswersByTestIdAsync(int testId);
        Task AddAsync(Answer answer);
        Task UpdateAsync(Answer answer);
        Task DeleteAsync(int id);
    }
}
