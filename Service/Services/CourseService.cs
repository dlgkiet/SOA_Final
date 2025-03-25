using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Service.IServices;
using DataAccess.IRepositories;


namespace Service.Services
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _courseRepository;

        public CourseService(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        public async Task<IEnumerable<Course>> GetAllCoursesAsync()
        {
            return await _courseRepository.GetAllCoursesAsync();
        }

        public async Task<Course?> GetCourseByIdAsync(int id)
        {
            return await _courseRepository.GetCourseByIdAsync(id);
        }

        public async Task<Course> CreateCourseAsync(Course newCourse)
        {
            return await _courseRepository.CreateCourseAsync(newCourse);
        }

        public async Task<Course?> UpdateCourseAsync(Course updatedCourse)
        {
            return await _courseRepository.UpdateCourseAsync(updatedCourse);
        }

        public async Task<bool> DeleteCourseAsync(int id)
        {
            return await _courseRepository.DeleteCourseAsync(id);
        }
    }
}
