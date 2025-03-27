using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    [Table("tests")] // Bảng Test trong PostgreSQL
    public class Test
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("content")]
        public string? Content { get; set; }

        [Column("teacher_id")]
        public int TeacherId { get; set; }

        [Column("deadline")]
        public DateTime Deadline { get; set; }

        [Column("course_id")]
        public int CourseId { get; set; }
    }
}