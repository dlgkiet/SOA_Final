using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    [Table("lessons")] // Bảng Lesson trong PostgreSQL
    public class Lesson
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("content")]
        public string Content { get; set; }

        [Column("file")]
        public string File { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [Column("teacher_id")]
        public int TeacherId { get; set; }

        [Column("student_ids", TypeName = "integer[]")] // Ánh xạ với PostgreSQL ARRAY
        public List<int>? StudentIds { get; set; } // Danh sách ID sinh viên, có thể NULL

        [Column("course_id")]
        public int CourseId { get; set; }
    }
}
