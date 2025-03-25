using Core.Entities;
using DataAccess.Context;
using DataAccess.IReposiories;


using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class AnswerRepository : IAnswerRepository
    {
        private readonly ApplicationDbContext _context;

        public AnswerRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Answer>> GetAllAsync()
        {
            return await _context.Set<Answer>().ToListAsync();
        }

        public async Task<Answer> GetByIdAsync(int id)
        {
            return await _context.Set<Answer>().FindAsync(id);
        }

        public async Task<IEnumerable<Answer>> GetAnswersByTestIdAsync(int testId)
        {
            return await _context.Set<Answer>().Where(a => a.TestId == testId).ToListAsync();
        }

        public async Task AddAsync(Answer answer)
        {
            await _context.Set<Answer>().AddAsync(answer);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Answer answer)
        {
            _context.Set<Answer>().Update(answer);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var answer = await GetByIdAsync(id);
            if (answer != null)
            {
                _context.Set<Answer>().Remove(answer);
                await _context.SaveChangesAsync();
            }
        }
    }
}
