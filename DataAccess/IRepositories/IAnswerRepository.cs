﻿using Core.Entities;

namespace DataAccess.IReposiories
{
    public interface IAnswerRepository
    {
        Task<IEnumerable<Answer>> GetAllAsync();
        Task<Answer> GetByIdAsync(int id);
        Task<IEnumerable<Answer>> GetAnswersByTestIdAsync(int testId);
        Task UpdateAsync(Answer answer);
        Task DeleteAsync(int id);
        Task SubmitAnswersAsync(SubmitAnswerDto dto);

    }
}
