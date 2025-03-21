using Core.Entities;
using DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<Teacher> RegisterTeacherAsync(Teacher teacher)
        {
            return await _userRepository.CreateTeacherAsync(teacher);
        }

        public async Task<Student> RegisterStudentAsync(Student student)
        {
            return await _userRepository.CreateStudentAsync(student);
        }
    }
}
