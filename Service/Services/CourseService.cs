using Core.Entities;
using DataAccess.IReposiories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _courseRepository;

        public CourseService(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        public async Task<bool> EnrollStudentAsync(int studentId, int courseId)
        {
            return await _courseRepository.EnrollStudentAsync(studentId, courseId);
        }

        public async Task<List<Course>> GetCoursesAsync()
        {
            return await _courseRepository.GetCoursesAsync();
        }
    }
}
