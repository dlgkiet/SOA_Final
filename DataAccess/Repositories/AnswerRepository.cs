﻿using Core.Entities;
using DataAccess.Context;
using DataAccess.IReposiories;


using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class AnswerRepository : IAnswerRepository
    {
        private readonly ApplicationDbContext _context;

        public AnswerRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Answer>> GetAllAsync()
        {
            return await _context.Set<Answer>().ToListAsync();
        }

        public async Task<Answer> GetByIdAsync(int id)
        {
            return await _context.Set<Answer>().FindAsync(id);
        }

        public async Task<IEnumerable<Answer>> GetAnswersByTestIdAsync(int testId)
        {
            return await _context.Set<Answer>().Where(a => a.TestId == testId).ToListAsync();
        }


        public async Task UpdateAsync(Answer answer)
        {
            _context.Set<Answer>().Update(answer);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var answer = await GetByIdAsync(id);
            if (answer != null)
            {
                _context.Set<Answer>().Remove(answer);
                await _context.SaveChangesAsync();
            }
        }

        public async Task SubmitAnswersAsync(SubmitAnswerDto dto)
        {
            foreach (var item in dto.SelectedAnswers)
            {
                var question = await _context.Questions.FindAsync(item.QuestionId);

                var answer = new Answer
                {
                    TestId = dto.TestId,
                    QuestionId = item.QuestionId,
                    StudentId = dto.StudentId,
                    SelectedAnswer = item.SelectedAnswer,
                    IsCorrect = question != null && question.CorrectAnswer == item.SelectedAnswer
                };

                _context.Answers.Add(answer);
            }

            await _context.SaveChangesAsync();
        }
    }
}
