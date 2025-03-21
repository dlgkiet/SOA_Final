using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public interface IUserService
    {
        Task<Teacher> RegisterTeacherAsync(Teacher teacher);
        Task<Student> RegisterStudentAsync(Student student);

        Task<IEnumerable<Teacher>> GetAllTeachersAsync();
        Task<IEnumerable<Student>> GetAllStudentsAsync();
        Task<Teacher> GetTeacherByIdAsync(int id);
        Task<Student> GetStudentByIdAsync(int id);
    }
}
