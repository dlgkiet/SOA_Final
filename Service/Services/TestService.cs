using Core.Entities;
using DataAccess.IRepositories;
using Service.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class TestService : ITestService
    {
        private readonly ITestRepository _testRepository;

        public TestService(ITestRepository testRepository)
        {
            _testRepository = testRepository;
        }

        public async Task<Test> GetTestByIdAsync(int id)
        {
            return await _testRepository.GetTestByIdAsync(id);
        }

        public async Task<IEnumerable<Test>> GetAllTestsAsync()
        {
            return await _testRepository.GetAllTestsAsync();
        }

        public async Task AddTestAsync(Test test)
        {
            await _testRepository.AddTestAsync(test);
        }

        public async Task UpdateTestAsync(Test test)
        {
            await _testRepository.UpdateTestAsync(test);
        }

        public async Task DeleteTestAsync(int id)
        {
            await _testRepository.DeleteTestAsync(id);
        }
    }
}
