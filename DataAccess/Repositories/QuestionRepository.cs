using Core.Entities;
using DataAccess.Context;
using DataAccess.IReposiories;


using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly ApplicationDbContext _context;

        public QuestionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Question>> GetAllAsync()
        {
            return await _context.Set<Question>().ToListAsync();
        }

        public async Task<Question> GetByIdAsync(int id)
        {
            return await _context.Set<Question>().FindAsync(id);
        }

        public async Task AddAsync(Question question)
        {
            await _context.Set<Question>().AddAsync(question);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Question question)
        {
            _context.Set<Question>().Update(question);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var question = await GetByIdAsync(id);
            if (question != null)
            {
                _context.Set<Question>().Remove(question);
                await _context.SaveChangesAsync();
            }
        }
    }
}
