using Core.Entities;
using DataAccess.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Context;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class LessonRepository : ILessonRepository
    {
        private readonly ApplicationDbContext _context;

        public LessonRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Lesson>> GetAllLessonsAsync()
        {
            return await _context.Lessons.ToListAsync();
        }

        public async Task<Lesson> GetLessonByIdAsync(int id)
        {
            return await _context.Lessons.FindAsync(id);
        }

        public async Task AddLessonAsync(Lesson lesson)
        {
            lesson.SetUtcDates(); // Đảm bảo CreatedAt và UpdatedAt là UTC
            await _context.Lessons.AddAsync(lesson);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateLessonAsync(Lesson lesson)
        {
            lesson.UpdatedAt = DateTime.UtcNow; // Luôn cập nhật `UpdatedAt` là UTC
            lesson.SetUtcDates(); // Đảm bảo dữ liệu lưu vào DB là UTC
            _context.Lessons.Update(lesson);
            await _context.SaveChangesAsync();
        }


        public async Task DeleteLessonAsync(int id)
        {
            var lesson = await _context.Lessons.FindAsync(id);
            if (lesson != null)
            {
                _context.Lessons.Remove(lesson);
                await _context.SaveChangesAsync();
            }
        }
    }
}
