using Core.Entities;
using DataAccess.Context;
using DataAccess.IReposiories;
using Microsoft.EntityFrameworkCore;



namespace DataAccess.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        private readonly ApplicationDbContext _context;

        public CourseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> EnrollStudentAsync(int studentId, int courseId)
        {
            var enrollment = new Enrollment
            {
                StudentId = studentId,
                CourseId = courseId,
                EnrolledDate = DateTime.UtcNow
            };
            _context.Enrollments.Add(enrollment);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Course>> GetCoursesAsync()
        {
            return await _context.Courses.ToListAsync();
        }

        public async Task<IEnumerable<Course>> GetAllCoursesAsync()
        {
            return await _context.Courses.ToListAsync();
        }

        public async Task<Course?> GetCourseByIdAsync(int id)
        {
            return await _context.Courses.FindAsync(id);
        }

        public async Task<Course> CreateCourseAsync(Course newCourse)
        {
            _context.Courses.Add(newCourse);
            await _context.SaveChangesAsync();
            return newCourse;
        }

        public async Task<Course?> UpdateCourseAsync(Course updatedCourse)
        {
            var existingCourse = await _context.Courses.FindAsync(updatedCourse.Id);
            if (existingCourse == null)
            {
                throw new Exception("Course not found");
            }

            // Cập nhật các trường khác nhưng giữ nguyên createdAt
            _context.Entry(existingCourse).CurrentValues.SetValues(updatedCourse);

            // Đặt trạng thái của createdAt thành Unchanged để EF không cập nhật nó
            _context.Entry(existingCourse).Property(c => c.CreatedAt).IsModified = false;

            await _context.SaveChangesAsync();
            return existingCourse;
        }

        public async Task<bool> DeleteCourseAsync(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null) return false;

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
