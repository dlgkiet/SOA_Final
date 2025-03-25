using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class SubmitAnswerDto
    {
        public int StudentId { get; set; }
        public int TestId { get; set; }
        public List<AnswerItemDto> SelectedAnswers { get; set; }
    }
}
