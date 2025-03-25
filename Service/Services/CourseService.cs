using Core.Entities;
<<<<<<< HEAD
using DataAccess.IReposiories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;
=======
using Microsoft.EntityFrameworkCore;
using Service.IServices;
using DataAccess.IRepositories;

>>>>>>> c69d4720d3eb36e9714f34ebe890ea29b4d55ae1

namespace Service.Services
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _courseRepository;

        public CourseService(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

<<<<<<< HEAD
        public async Task<bool> EnrollStudentAsync(int studentId, int courseId)
        {
            return await _courseRepository.EnrollStudentAsync(studentId, courseId);
        }

        public async Task<List<Course>> GetCoursesAsync()
        {
            return await _courseRepository.GetCoursesAsync();
=======
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
>>>>>>> c69d4720d3eb36e9714f34ebe890ea29b4d55ae1
        }
    }
}
