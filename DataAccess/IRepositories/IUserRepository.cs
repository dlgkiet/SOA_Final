using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;

namespace DataAccess.IReposiories
{
    public interface IUserRepository
    {
        Task<Teacher> CreateTeacherAsync(Teacher teacher);
        Task<Student> CreateStudentAsync(Student student);
        Task<Teacher> GetTeacherByIdAsync(int id);
        Task<Student> GetStudentByIdAsync(int id);
        Task<IEnumerable<Teacher>> GetAllTeachersAsync();
        Task<IEnumerable<Student>> GetAllStudentsAsync();

        Task<bool> UpdatePasswordAsync(int id, string newPassword);
        Task<bool> UpdatePersonalInfoAsync(int id, string name, DateTime birthday, string email, int classId);


    }
}
