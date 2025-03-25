using Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataAccess.IReposiories
{
    public interface ICourseRepository
    {
        Task<bool> EnrollStudentAsync(int studentId, int courseId);
        Task<List<Course>> GetCoursesAsync();
        Task<IEnumerable<Course>> GetAllCoursesAsync();
        Task<Course?> GetCourseByIdAsync(int id);
        Task<Course> CreateCourseAsync(Course newCourse);
        Task<Course?> UpdateCourseAsync(Course updatedCourse);
        Task<bool> DeleteCourseAsync(int id);
    }
}
