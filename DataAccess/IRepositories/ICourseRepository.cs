using System;
using Core.Entities;
namespace DataAccess.IRepositories
{
    public interface ICourseRepository
    {
        Task<IEnumerable<Course>> GetAllCoursesAsync();
        Task<Course?> GetCourseByIdAsync(int id);
        Task<Course> CreateCourseAsync(Course newCourse);
        Task<Course?> UpdateCourseAsync(Course updatedCourse);
        Task<bool> DeleteCourseAsync(int id);
    }
}