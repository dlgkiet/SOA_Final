using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.IRepositories
{
    public interface ITestRepository
    {
        Task<Test> GetTestByIdAsync(int id);
        Task<IEnumerable<Test>> GetAllTestsAsync();
        Task AddTestAsync(Test test);
        Task UpdateTestAsync(Test test);
        Task DeleteTestAsync(int id);
    }
}
