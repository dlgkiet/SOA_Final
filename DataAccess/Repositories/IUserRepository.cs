using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;

namespace DataAccess.Repositories
{
    public interface IUserRepository
    {
        Task<Teacher> CreateTeacherAsync(Teacher teacher);
        Task<Student> CreateStudentAsync(Student student);
        Task<Teacher> GetTeacherByIdAsync(int id);
        Task<Student> GetStudentByIdAsync(int id);
    }
}
