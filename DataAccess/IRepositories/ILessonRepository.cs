using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.IRepositories
{
    public interface ILessonRepository
    {
        Task<IEnumerable<Lesson>> GetAllLessonsAsync();
        Task<Lesson> GetLessonByIdAsync(int id);
        Task AddLessonAsync(Lesson lesson);
        Task UpdateLessonAsync(Lesson lesson);
        Task DeleteLessonAsync(int id);
    }
}
