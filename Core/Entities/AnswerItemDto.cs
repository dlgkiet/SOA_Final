using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class AnswerItemDto
    {
        public int QuestionId { get; set; }
        public string SelectedAnswer { get; set; } // A/B/C/D
    }
}
