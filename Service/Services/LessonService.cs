using Core.Entities;
using DataAccess.IRepositories;
using Service.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class LessonService : ILessonService
    {
        private readonly ILessonRepository _lessonRepository;

        public LessonService(ILessonRepository lessonRepository)
        {
            _lessonRepository = lessonRepository;
        }

        public async Task<IEnumerable<Lesson>> GetAllLessonsAsync()
        {
            return await _lessonRepository.GetAllLessonsAsync();
        }

        public async Task<Lesson> GetLessonByIdAsync(int id)
        {
            return await _lessonRepository.GetLessonByIdAsync(id);
        }

        public async Task AddLessonAsync(Lesson lesson)
        {
            lesson.SetUtcDates();
            await _lessonRepository.AddLessonAsync(lesson);
        }

        public async Task UpdateLessonAsync(Lesson lesson)
        {
            lesson.UpdatedAt = DateTime.UtcNow;
            await _lessonRepository.UpdateLessonAsync(lesson);
        }

        public async Task DeleteLessonAsync(int id)
        {
            await _lessonRepository.DeleteLessonAsync(id);
        }
    }
}
