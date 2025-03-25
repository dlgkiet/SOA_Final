using Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface ICourseService
    {
        Task<bool> EnrollStudentAsync(int studentId, int courseId);
        Task<List<Course>> GetCoursesAsync();
    }
}
