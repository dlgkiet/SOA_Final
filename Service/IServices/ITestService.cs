using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface ITestService
    {
        Task<Test> GetTestByIdAsync(int id);
        Task<IEnumerable<Test>> GetAllTestsAsync();
        Task AddTestAsync(Test test);
        Task UpdateTestAsync(Test test);
        Task DeleteTestAsync(int id);
    }
}
