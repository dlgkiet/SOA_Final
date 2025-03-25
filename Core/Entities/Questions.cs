using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    [Table("questions")]
    public class Question
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("test_id")]
        public int TestId { get; set; }

        [Column("teacher_id")]
        public int TeacherId { get; set; } // ✅ Thêm dòng này

        [Column("content")]
        public string Content { get; set; }

        [Column("option_a")]
        public string OptionA { get; set; }

        [Column("option_b")]
        public string OptionB { get; set; }

        [Column("option_c")]
        public string OptionC { get; set; }

        [Column("option_d")]
        public string OptionD { get; set; }

        [Column("correct_answer")]
        public string CorrectAnswer { get; set; }

        // Optional: Có thể thêm navigation đến Teacher nếu có entity Teacher
        // [ForeignKey("TeacherId")]
        // public Teacher Teacher { get; set; }
    }

}
