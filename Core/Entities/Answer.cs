using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace Core.Entities
{
    [Table("answers")]
    public class Answer
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("student_id")]
        public int StudentId { get; set; }

        [Column("test_id")]
        public int TestId { get; set; }

        [Column("selected_answers", TypeName = "jsonb")]
        public List<AnswerSelection> SelectedAnswers { get; set; } // Mảng đáp án sinh viên chọn

        [ForeignKey("TestId")]
        public Test Test { get; set; }

        [ForeignKey("StudentId")]
        public Student Student { get; set; }
    }

    public class AnswerSelection
    {
        public int QuestionId { get; set; }
        public string Choice { get; set; } // Đáp án đã chọn: "A", "B", "C", "D"
    }
}
