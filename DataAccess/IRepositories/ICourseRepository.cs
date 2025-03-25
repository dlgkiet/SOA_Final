using Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataAccess.IReposiories
{
    public interface ICourseRepository
    {
        Task<bool> EnrollStudentAsync(int studentId, int courseId);
        Task<List<Course>> GetCoursesAsync();
    }
}
