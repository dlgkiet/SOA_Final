using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;
using DataAccess.Context;
using DataAccess.IReposiories;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Teacher> CreateTeacherAsync(Teacher teacher)
        {
            _context.Teachers.Add(teacher);
            await _context.SaveChangesAsync();
            return teacher;
        }

        public async Task<Student> CreateStudentAsync(Student student)
        {
            _context.Students.Add(student);
            await _context.SaveChangesAsync();
            return student;
        }

        public async Task<Teacher> GetTeacherByIdAsync(int id)
        {
            return await _context.Teachers.FindAsync(id);
        }

        public async Task<Student> GetStudentByIdAsync(int id)
        {
            return await _context.Students.FindAsync(id);
        }

        public async Task<IEnumerable<Teacher>> GetAllTeachersAsync()
        {
            return await _context.Teachers.ToListAsync();
        }

        public async Task<IEnumerable<Student>> GetAllStudentsAsync()
        {
            return await _context.Students.ToListAsync();
        }

        // Cập nhật password
        public async Task<bool> UpdatePasswordAsync(int id, string newPassword)
        {
            var user = await _context.Teachers.FindAsync(id) ?? (object)await _context.Students.FindAsync(id);
            if (user != null)
            {
                if (user is Teacher teacher)
                {
                    teacher.Password = newPassword;
                }
                else if (user is Student student)
                {
                    student.Password = newPassword;
                }

                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        // Cập nhật thông tin cá nhân (không bao gồm password)
        public async Task<bool> UpdatePersonalInfoAsync(int id, string name, DateTime birthday, string email, int classId)
        {
            var user = await _context.Teachers.FindAsync(id) ?? (object)await _context.Students.FindAsync(id);
            if (user != null)
            {
                if (user is Teacher teacher)
                {
                    teacher.Name = name;
                    teacher.Birthday = birthday;
                    teacher.Email = email;
                    teacher.CourseId = classId;
                }
                else if (user is Student student)
                {
                    student.Name = name;
                    student.Birthday = birthday;
                    student.Email = email;
                    student.CourseId = classId;
                }

                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
