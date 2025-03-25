using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    [Table("answers")]
    public class Answer
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("test_id")]
        public int TestId { get; set; }

        [Column("question_id")]
        public int QuestionId { get; set; }

        [Column("student_id")]
        public int StudentId { get; set; }

        [Column("selected_answer")]
        public string SelectedAnswer { get; set; } // Sinh viên chọn A/B/C/D

        [Column("is_correct")]
        public bool IsCorrect { get; set; } // Đúng hoặc sai

        [ForeignKey("TestId")]
        public Test Test { get; set; }

        [ForeignKey("QuestionId")]
        public Question Question { get; set; }

        [ForeignKey("StudentId")]
        public Student Student { get; set; }
    }
}
